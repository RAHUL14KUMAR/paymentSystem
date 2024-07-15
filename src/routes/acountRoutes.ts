import express from 'express';
const router = express.Router();
const{accountsDetails,createAccount,addDepositsToAccount,withdrawalDeposistsFromAccount}=require('../controllers/accountController');
import { authMiddleware } from '../middleware/authMiddleware';

router.route('/create')
.post(authMiddleware,createAccount);

router.route('/details/:accountid')
.get(authMiddleware,accountsDetails)
.put(authMiddleware,addDepositsToAccount)
.patch(authMiddleware,withdrawalDeposistsFromAccount)

module.exports = router;