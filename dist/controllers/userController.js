"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user = require('../model/userSchema');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function extractTextBeforeAt(email) {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) {
        return email;
    }
    return email.slice(0, atIndex);
}
const generateJwt = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: "30d",
    });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: "please provide all the details" });
    }
    const uniqueEmail = yield user.findOne({ email: email });
    if (uniqueEmail) {
        res.status(404).json({ message: "user with this email already exists" });
        return;
    }
    const hashPassword = yield bcryptjs_1.default.hash(password, 10);
    const registerUser = new user({
        firstname,
        lastname,
        email,
        password: hashPassword,
        username: extractTextBeforeAt(email) + (Math.random() * 100000).toString().substring(0, 4)
    });
    try {
        yield registerUser.save();
        res.status(201).json({
            username: registerUser.username,
            email: registerUser.email,
            firstname: registerUser.firstname,
            lastname: registerUser.lastname,
            password: registerUser.password,
            token: generateJwt(registerUser._id)
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong while registering the user" });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "please provide email and password" });
        return;
    }
    const users = yield user.findOne({ email: email });
    if (!users) {
        res.status(404).json({ message: "user with this email does not exist" });
        return;
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, users.password);
    if (!isPasswordCorrect) {
        res.status(401).json({ message: "wrong password" });
        return;
    }
    res.status(200).json({
        username: users.username,
        email: users.email,
        firstname: users.firstname,
        lastname: users.lastname,
        token: generateJwt(users._id)
    });
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, firstname, lastname, newemail, newpassword } = req.body;
    if (!username || !firstname || !lastname || !newemail || !newpassword) {
        res.status(400).json({ message: "please provide all the details" });
        return;
    }
    const users = yield user.findOne({ username: username });
    if (!users) {
        res.status(404).json({ message: "user with this username does not exist" });
        return;
    }
    const hashPassword = yield bcryptjs_1.default.hash(newpassword, 10);
    const updatedUser = yield user.findByIdAndUpdate(users._id, {
        firstname,
        lastname,
        email: newemail,
        password: hashPassword
    }, { new: true });
    yield updatedUser.save();
    res.status(200).json({
        username: updatedUser.username,
        email: updatedUser.email,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        token: generateJwt(updatedUser._id)
    });
});
module.exports = {
    registerUser,
    loginUser,
    updateUser
};
