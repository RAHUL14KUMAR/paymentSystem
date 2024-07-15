"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
const paymentSchema = new schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['initiated', 'authorized', 'captured', 'failed', 'refunded'],
    },
    paymentMethod: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true,
        descriminatorKey: 'type'
    }
});
const creditCardSchema = new mongoose_1.default.Schema({
    type: { type: String, default: 'credit_card' },
    card_number: { type: String, required: true },
    cvv: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cardHolderName: { type: String, required: true },
});
const debitCardSchema = new mongoose_1.default.Schema({
    type: { type: String, default: 'debit_card' },
    card_number: { type: String, required: true },
    cvv: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    bankDetails: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'accounts'
    }
});
paymentSchema.discriminator('credit_card', creditCardSchema);
paymentSchema.discriminator('debit_card', debitCardSchema);
