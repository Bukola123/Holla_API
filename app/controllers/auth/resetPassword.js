const User = require('../../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.resetPassword = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, otp, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res
            .status(422)
            .json({ errors: [{ msg: 'Passwords do not match' }] });
    }

    let user;
    try {
        user = await User.findOne({ email });
    } catch (err) {
        if (err.code === 11000) {
            return res
                .status(422)
                .json({ errors: [{ msg: 'User does not exist' }] });
        }
        return res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
    

    if (user.otp !== Number(otp)) {
        return res.status(422).json({ errors: [{ msg: 'OTP is incorrect' }] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.otp = null;
    await user.save();
    res.status(200).json({ msg: 'Password Successfully Changed' });
};