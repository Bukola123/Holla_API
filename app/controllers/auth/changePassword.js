const User = require('../../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.changePassword = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
        return res
            .status(422)
            .json({ errors: [{ msg: 'New Passwords do not match' }] });
    }

    
    let user;
    try {
        user = await User.findOne({ email });
    } 
    catch (err) {
        if (err.code === 11000) {
            return res
                .status(422)
                .json({ errors: [{ msg: 'User does not exist' }] });
        }
        return res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res
            .status(422)
            .json({ errors: [{ msg: 'Password is incorrect' }] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ msg: 'Password Successfully Changed' });
};