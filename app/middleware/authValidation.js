const  {check} = require('express-validator');


exports.authCredentialsValidation = [
    check('email','Enter a valid mail').isEmail(),
    check ('password', 'Password must be at least 6 characters').isLength({min:6})
];

exports.loginValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
];

exports.validateEmail = [
    check('email', 'Please include a valid email').isEmail()
];