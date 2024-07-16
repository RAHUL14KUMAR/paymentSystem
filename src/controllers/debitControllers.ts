import { Request, Response } from "express";
const Payment = require('../model/paymentSchema');
const accounts = require('../model/acountSchema');

const makePaymentViaDebitCard=async (req: Request & { user?: any }, res: Response) => {
    const{card_number,cvv,expiryDate,amount}=req.body;
    const{_id,username}=req.user;

    if(!card_number ||!cvv ||!expiryDate) {
        res.status(400).json({ message: "Please provide all the details" });
        return;
    }

    const account=await accounts.findOne({userId:_id});
    if(!account) {
        res.status(404).json({ message: "Account not found" });
        return;
    }

    const payment=await Payment.create({
        userId: _id,
        amount:amount,
        status: 'initiated',
        paymentMethod:{
            type:'debit_card',
            card_number:card_number,
            cvv:cvv,
            expiryDate:expiryDate,
            cardHolderName:username,
            bankDetails:account._id
        }
    })

    try{
        await payment.save();
        let a:string=await changePaymentStatus({accountId:account._id,paymentId:payment._id})
        
        if(a=="error") {
            res.status(401).json({message:"insufficient balance"})
        }else{
            const info=await Payment.findById(payment._id).populate('userId');
            res.status(201).json({
                message: "Payment done successfully",
                payment:info
            });
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

async function changePaymentStatus({accountId,paymentId}:{accountId:string,paymentId:string}) {
    // TODO: change the status of the payment
    // if the payment is successful then deduct the amount from the account balance
    const payment=await Payment.findById(paymentId)
    const account=await accounts.findById(accountId)

    if(payment.amount>account.balance) {
        await Payment.findByIdAndUpdate(paymentId,{status:'failed'},{new:true})
        return "error"
    }else{
        await Payment.findByIdAndUpdate(paymentId,{status:'successfull'},{new:true})
        account.balance-=payment.amount
        await account.save()

        return "success"
    }

    // if the payment is unsuccessful then add the amount back to the account balance
}


// user can see the debit card details
const debitCardDetails=async(req: Request & { user?: any }, res: Response) => {
    const{_id}=req.user;
    const pay=await Payment.find({userId: _id,
        'paymentMethod.type': 'debit_card'});

    if(!pay) {
        res.status(404).json({ message: "Payment not found" });
        return;
    }
    if(pay.length==0) {
        res.status(201).json({ message: "no payment has been done by debit card" });
        return;
    }
    res.status(200).json({
        message: "Payment details found successfully",
        payment:pay
    });

}

module.exports={
    makePaymentViaDebitCard,
    debitCardDetails  
}