const express = require('express');
const router = express.Router();

const {authCredentialsValidation} = require ('../app/middleware/authValidation')
const {registerUser} = require('../app/controllers/auth')

router.post ('/register', authCredentialsValidation, registerUser);

module.exports = router