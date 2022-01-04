const User = require('../../models/User');
const { validationResult } = require('express-validator');
const { sendMail } = require('../../utils/index');
const { resetPassword } = require('./resetPassword');


exports.forgotPassword = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        
        const otp = Math.floor(1000 + Math.random() * 9000);
        user.otp = otp;
        await user.save();
        // send mail
        const subject = 'Holla  - Forgot Password';
        const text = `Hi ${user.email}, use this otp to reset your password: ${user.otp}`;
        sendMail(String(email), subject, text);
        res.status(200).json({ msg: 'OTP sent' });
        
    } catch (err) {
        if (err.code === 11000) {
            return res
                .status(422)
                .json({ errors: [{ msg: 'User does not exist' }] });
        }
        return res.status(500).json({ msg: 'internal server error' });
     
    }
    resetPassword();
};