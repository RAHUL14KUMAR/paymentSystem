const mongoose = require('mongoose');
const url:string = process.env.MONGO_URI || '';
export const connect=async()=>{
    try{
        await mongoose.connect(url);
        console.log("Connected to the database");
    }catch(err){
        console.log("error in mongodb connection",err);
    }
}
