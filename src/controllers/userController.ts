const user=require('../model/userSchema');
import express, { Request, Response as ExpressResponse } from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

function extractTextBeforeAt(email:string):string{
    const atIndex = email.indexOf('@');
    if (atIndex === -1) {
      return email;
    }
    return email.slice(0, atIndex);
}

const generateJwt = (id: string) => {
    return jwt.sign({ id }, process.env.SECRET_KEY as jwt.Secret, {
      expiresIn: "30d",
    });
};
const registerUser = async (req: Request, res: ExpressResponse) => {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: "please provide all the details" })
    }

    const uniqueEmail=await user.findOne({email:email});
    if(uniqueEmail){
        res.status(404).json({message:"user with this email already exists"})
        return;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const registerUser = new user({
        firstname,
        lastname,
        email,
        password:hashPassword,
        username: extractTextBeforeAt(email)+(Math.random()*100000).toString().substring(0,4)
    });
    try {
        await registerUser.save();
        res.status(201).json({
            username:registerUser.username,
            email:registerUser.email,
            firstname:registerUser.firstname,
            lastname:registerUser.lastname,
            password:registerUser.password,
            token:generateJwt(registerUser._id)
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong while registering the user" })
    }
};

const loginUser=async(req: Request, res: ExpressResponse)=>{
    const {email,password}=req.body;
    if(!email ||!password){
        res.status(400).json({message:"please provide email and password"})
        return;
    }
    const users=await user.findOne({email:email});
    if(!users){
        res.status(404).json({message:"user with this email does not exist"})
        return;
    }
    const isPasswordCorrect=await bcrypt.compare(password,users.password);
    if(!isPasswordCorrect){
        res.status(401).json({message:"wrong password"})
        return;
    }
    res.status(200).json({
        username:users.username,
        email:users.email,
        firstname:users.firstname,
        lastname:users.lastname,
        token:generateJwt(users._id)
    })
}

const updateUser=async(req: Request, res: ExpressResponse)=>{
    const {username,firstname,lastname,newemail,newpassword}=req.body;

    if(!username ||!firstname ||!lastname ||!newemail ||!newpassword){
        res.status(400).json({message:"please provide all the details"})
        return;
    }

    const users=await user.findOne({username:username});
    if(!users){
        res.status(404).json({message:"user with this username does not exist"})
        return;
    }

    const hashPassword=await bcrypt.hash(newpassword,10);
    const updatedUser=await user.findByIdAndUpdate(users._id,{
        firstname,
        lastname,
        email:newemail,
        password:hashPassword
    },{new:true});
    await updatedUser.save();

    res.status(200).json({
        username:updatedUser.username,
        email:updatedUser.email,
        firstname:updatedUser.firstname,
        lastname:updatedUser.lastname,
        token:generateJwt(updatedUser._id)
    })
}

module.exports={
    registerUser,
    loginUser,
    updateUser
}