"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Payment = require('../model/paymentSchema');
const accounts = require('../model/acountSchema');
const makePaymentViaDebitCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { card_number, cvv, expiryDate, amount } = req.body;
    const { _id, username } = req.user;
    if (!card_number || !cvv || !expiryDate) {
        res.status(400).json({ message: "Please provide all the details" });
        return;
    }
    const account = yield accounts.findOne({ userId: _id });
    if (!account) {
        res.status(404).json({ message: "Account not found" });
        return;
    }
    const payment = yield Payment.create({
        userId: _id,
        amount: amount,
        status: 'initiated',
        paymentMethod: {
            type: 'debit_card',
            card_number: card_number,
            cvv: cvv,
            expiryDate: expiryDate,
            cardHolderName: username,
            bankDetails: account._id
        }
    });
    try {
        yield payment.save();
        let a = yield changePaymentStatus({ accountId: account._id, paymentId: payment._id });
        if (a == "error") {
            res.status(401).json({ message: "insufficient balance" });
        }
        else {
            const info = yield Payment.findById(payment._id).populate('userId');
            res.status(201).json({
                message: "Payment done successfully",
                payment: info
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
function changePaymentStatus(_a) {
    return __awaiter(this, arguments, void 0, function* ({ accountId, paymentId }) {
        // TODO: change the status of the payment
        // if the payment is successful then deduct the amount from the account balance
        const payment = yield Payment.findById(paymentId);
        const account = yield accounts.findById(accountId);
        if (payment.amount > account.balance) {
            yield Payment.findByIdAndUpdate(paymentId, { status: 'failed' }, { new: true });
            return "error";
        }
        else {
            yield Payment.findByIdAndUpdate(paymentId, { status: 'successfull' }, { new: true });
            account.balance -= payment.amount;
            yield account.save();
            return "success";
        }
        // if the payment is unsuccessful then add the amount back to the account balance
    });
}
// user can see the debit card details
const debitCardDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const pay = yield Payment.find({ userId: _id,
        'paymentMethod.type': 'debit_card' });
    if (!pay) {
        res.status(404).json({ message: "Payment not found" });
        return;
    }
    if (pay.length == 0) {
        res.status(201).json({ message: "no payment has been done by debit card" });
        return;
    }
    res.status(200).json({
        message: "Payment details found successfully",
        payment: pay
    });
});
module.exports = {
    makePaymentViaDebitCard,
    debitCardDetails
};
