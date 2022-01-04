const { validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.loginUser = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
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

    if (!user.isActive) {
        return res
            .status(422)
            .json({ errors: [{ msg: 'User is not verified, please check your email for the verification link' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res
            .status(422)
            .json({ errors: [{ msg: 'Password is incorrect' }] });
    }

    const payload = {
        id: user.id
    };

    await jwt.sign(payload, 'secret', { expiresIn: 3600000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
    });
};
