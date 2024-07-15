"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const accountSchema = new Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    balance: {
        type: Number,
    },
    currency: {
        type: String,
        default: 'INR'
    },
    bankName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    bankBranch: {
        type: String,
        required: true
    },
    bankIFSC: {
        type: String,
        required: true
    },
    bankAddress: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose_1.default.model('accounts', accountSchema);
