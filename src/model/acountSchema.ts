import mongoose from'mongoose';
const Schema = mongoose.Schema;

const accountSchema=new Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
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
        bankName:{
            type:String,
            required:true
        },
        accountNumber:{
            type:String,
            required:true
        },
        bankBranch:{
            type:String,
            required:true
        },
        bankIFSC:{
            type:String,
            required:true
        },
        bankAddress:{
            type:String,
            required:true
        }    
},{
    timestamps: true
})

module.exports=mongoose.model('accounts',accountSchema)