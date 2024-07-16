"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { makePaymentViaCreditCard, creditCardDetails, clearCreditCardDues } = require('../controllers/creditControllers');
const authMiddleware_1 = require("../middleware/authMiddleware");
router.route('/credit-card')
    .post(authMiddleware_1.authMiddleware, makePaymentViaCreditCard);
router.route('/credit-card-details')
    .get(authMiddleware_1.authMiddleware, creditCardDetails);
router.route('/credit-card/clear-dues')
    .put(authMiddleware_1.authMiddleware, clearCreditCardDues);
module.exports = router;
