const { check } = require('express-validator');

exports.loginValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
];


exports.createProfileValidation = [
    check('name', 'Amount is required').not().isEmpty(),
    check('phone', 'Amount is required').not().isMobilePhone(),
    
];