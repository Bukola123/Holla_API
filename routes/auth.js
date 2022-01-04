const express = require('express');
const router = express.Router();

const {authCredentialsValidation,loginValidation, validateEmail} = require ('../app/middleware/authValidation');
const {registerUser} = require('../app/controllers/auth/register')
const {verifyUser} = require('../app/controllers/auth/verifyUser')
const {loginUser} = require('../app/controllers/auth/loginUser');
const { forgotPassword } = require('../app/controllers/auth/forgotPassord');
const { resetPassword } = require('../app/controllers/auth/resetPassword');
const { changePassword } = require('../app/controllers/auth/changePassword');

router.post ('/register', authCredentialsValidation, registerUser);
router.get ('/verifyUser', verifyUser);
router.get ('/login',loginValidation, loginUser);
router.post ('/forgot-password',validateEmail,forgotPassword );
router.post('/reset-password', resetPassword);
router.put('/change-password', changePassword);

module.exports = router