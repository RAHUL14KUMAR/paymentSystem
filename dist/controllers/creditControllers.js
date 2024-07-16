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
// make payment via credit card
const makePaymentViaCreditCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, cvv, expiryDate, card_number } = req.body;
    const { _id, username } = req.user;
    if (!amount || !cvv || !expiryDate || !card_number) {
        res.status(400).json({ message: "Please provide all the details" });
        return;
    }
    // fetch the user credit card details and find the total pending amount
    const creditCardTotalAmount = yield Payment.find({ userId: _id, 'paymentMethod.type': 'credit_card' });
    const creditCardTotalAmountSum = creditCardTotalAmount.reduce((acc, curr) => acc + curr.paymentMethod.pendingAmount, 0);
    if (creditCardTotalAmountSum >= 100000) {
        res.status(404).json({ message: "You have already made a payment of Rs.100000 please pay the bending bills first" });
        return;
    }
    const payments = new Payment({
        userId: _id,
        amount: amount,
        status: 'initiated',
        paymentMethod: {
            type: 'credit_card',
            card_number: card_number,
            cvv: cvv,
            expiryDate: expiryDate,
            cardHolderName: username,
            pendingAmount: creditCardTotalAmountSum + amount
        }
    });
    try {
        yield payments.save();
        const info = yield payments.populate('userId');
        res.status(201).json({
            message: "Payment done successfully",
            payment: info
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
// display the credit card details of the user
const creditCardDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const pay = yield Payment.find({ userId: _id,
        'paymentMethod.type': 'credit_card' });
    if (!pay) {
        res.status(404).json({ message: "Payment not found or no payment has been done by credit card" });
        return;
    }
    res.status(200).json({
        message: "Payment details found successfully",
        payment: pay
    });
});
// clear credit card dues
const clearCreditCardDues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    // get all credit cards bills
    const pay = yield Payment.find({ userId: _id,
        'paymentMethod.type': 'credit_card' }).populate('userId');
    // fetch the last bill pending amount
    const payAmountIndex = pay[pay.length - 1].paymentMethod.pendingAmount;
    if (payAmountIndex == 0) {
        res.status(201).json({ message: "You have already cleared all the credit card dues" });
        return;
    }
    if (!pay) {
        res.status(404).json({ message: "Payment not found or no payment has been done by credit card" });
        return;
    }
    const account = yield accounts.findOne({ userId: _id });
    account.balance -= payAmountIndex;
    yield account.save();
    try {
        updatePendingAmountDetails(_id);
        res.status(201).json({
            message: "all credit card dues cleared",
            pay
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
function updatePendingAmountDetails(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const payments = yield Payment.find({ userId: id,
            'paymentMethod.type': 'credit_card' });
        for (const payment of payments) {
            yield Payment.findByIdAndUpdate(payment._id, { $set: { 'paymentMethod.pendingAmount': 0 } }, { new: true });
        }
    });
}
module.exports = {
    makePaymentViaCreditCard,
    creditCardDetails,
    clearCreditCardDues
};
