const express = require('express');
const router = express.Router();
const {registerUser,loginUser,updateUser}=require('../controllers/userController');

router.route('/register')
.post(registerUser);

router.route('/login')
.post(loginUser)

router.route('/update')
.put(updateUser)

module.exports = router;