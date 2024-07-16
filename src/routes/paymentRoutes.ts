import express from 'express';
const router = express.Router();
const{makePaymentViaCreditCard,creditCardDetails,clearCreditCardDues}=require('../controllers/creditControllers');
import { authMiddleware } from '../middleware/authMiddleware';

router.route('/credit-card')
.post(authMiddleware,makePaymentViaCreditCard);

router.route('/credit-card-details')
.get(authMiddleware,creditCardDetails)

router.route('/credit-card/clear-dues')
.put(authMiddleware,clearCreditCardDues);

module.exports = router;