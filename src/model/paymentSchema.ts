import mongoose, { Mongoose } from 'mongoose';

const schema=mongoose.Schema;
const paymentSchema=new schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status: {
        type: String,
        required: true,
        enum: ['initiated', 'authorized', 'captured', 'failed', 'refunded'],
    },

    paymentMethod:{
        type:mongoose.Schema.Types.Mixed,
        required:true,
        descriminatorKey:'type'
    }
})

const creditCardSchema = new mongoose.Schema({
    type: { type: String, default: 'credit_card' },
    card_number: { type: String, required: true },
    cvv: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cardHolderName: { type: String, required: true },
});
  
const debitCardSchema = new mongoose.Schema({
    type: { type: String, default: 'debit_card' },
    card_number: { type: String, required: true },
    cvv: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    bankDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'accounts'
    }
});
  
paymentSchema.discriminator('credit_card', creditCardSchema);
paymentSchema.discriminator('debit_card', debitCardSchema);