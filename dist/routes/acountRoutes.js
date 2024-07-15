"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { accountsDetails, createAccount, addDepositsToAccount, withdrawalDeposistsFromAccount } = require('../controllers/accountController');
const authMiddleware_1 = require("../middleware/authMiddleware");
router.route('/create')
    .post(authMiddleware_1.authMiddleware, createAccount);
router.route('/details/:accountid')
    .get(authMiddleware_1.authMiddleware, accountsDetails)
    .put(authMiddleware_1.authMiddleware, addDepositsToAccount)
    .patch(authMiddleware_1.authMiddleware, withdrawalDeposistsFromAccount);
module.exports = router;
