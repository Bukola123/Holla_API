const User = require('../../../app/models/User');

exports.verifyUser = async function (req, res) {
    const { otp, id } = req.query;

    // find user with id
    const user = await User.findById(id);

    if (!user || user.otp != otp) {
        return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // activate user
    user.otp = null;
    user.isActive = true;

    // save user
    await user.save();
    // return response
    res.status(200).json({ msg: 'User verification successful' });
};