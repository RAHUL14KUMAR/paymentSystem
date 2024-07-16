import express from 'express';

const router = express.Router();

const{makePaymentViaCreditCard,creditCardDetails,clearCreditCardDues}=require('../controllers/creditControllers');
const{makePaymentViaDebitCard,debitCardDetails}=require('../controllers/debitControllers');

import { authMiddleware } from '../middleware/authMiddleware';

router.route('/credit-card')
.post(authMiddleware,makePaymentViaCreditCard);

router.route('/credit-card-details')
.get(authMiddleware,creditCardDetails)

router.route('/credit-card/clear-dues')
.put(authMiddleware,clearCreditCardDues);


router.route('/debit-card')
.post(authMiddleware,makePaymentViaDebitCard);

router.route('/debit-card-details')
.get(authMiddleware,debitCardDetails)

module.exports = router;