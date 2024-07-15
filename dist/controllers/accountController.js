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
const accounts = require('../model/acountSchema');
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bankName, bankBranch, bankAddress } = req.body;
    if (!bankName || !bankBranch || !bankAddress) {
        res.status(400).json({ message: "Please provide all the details" });
        return;
    }
    const { _id } = req.user;
    let a = (Math.random()) * (Math.pow(10, 12));
    const accountNumber = a.toString().substring(0, 12);
    let b = (Math.random()) * (Math.pow(10, 12));
    const bankIFSC = b.toString().substring(0, 12);
    const account = new accounts({
        userId: _id,
        bankName,
        accountNumber: accountNumber,
        bankBranch,
        bankIFSC: bankIFSC,
        bankAddress,
        balance: 0,
    });
    yield account.save();
    res.status(201).json({
        message: "Account created successfully",
        account: account
    });
});
const accountsDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const accountId = req.params.accountid;
    const account = yield accounts.findOne({ _id: accountId }).populate('userId');
    if (!account) {
        res.status(404).json({ message: "Account not found" });
        return;
    }
    res.status(200).json({
        message: "Account found successfully",
        account: account
    });
});
// person who deposits money to his/her sccount(in-person)
const addDepositsToAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const accountId = req.params.accountid;
    const { amount } = req.body;
    const account = yield accounts.findOne({ _id: accountId }).populate('userId');
    if (!account) {
        res.status(404).json({ message: "Account not found" });
        return;
    }
    else {
        account.balance += amount;
        yield account.save();
    }
    res.status(200).json({
        message: "Amount added successfully",
        account: account
    });
});
// person withdraws the money from his/her account(in-person)
const withdrawalDeposistsFromAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const accountId = req.params.accountid;
    const { amount } = req.body;
    const account = yield accounts.findOne({ _id: accountId });
    if (!account) {
        res.status(404).json({ message: "Account not found" });
        return;
    }
    if (account.userId.toString() !== _id.toString()) {
        res.status(401).json({ message: "You are not authorized to withdraw this amount" });
        return;
    }
    if (account.balance < amount) {
        res.status(400).json({ message: "Insufficient balance" });
        return;
    }
    account.balance -= amount;
    yield account.save();
    res.status(200).json({
        message: "Amount withdrawn successfully",
        account: account
    });
});
module.exports = {
    createAccount,
    accountsDetails,
    addDepositsToAccount,
    withdrawalDeposistsFromAccount
};
