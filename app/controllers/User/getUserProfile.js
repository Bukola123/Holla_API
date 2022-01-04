const { validationResult } = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const jwt = require('jsonwebtoken');

exports.getUserProfile = async function (req, res) {
    const { id } = req.user;
    const { profileId } = req.params;

    // check if user is rgister
    let profile;
    try {
        profile = await Profile.findById(profileId);
    } catch (err) {
        if (err.message.includes('Cast to ObjectId failed for value')) {
            return res.status(400).json({ msg: 'Invalid profile ID' });
        }
        return res.status(500).json({ message: 'Server error' });
    }

    if (!profile) {
        return res.status(404).json({ msg: 'User not found' });
    }

    // check if user owns the account
    if (profile.owner.toString() !== id) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    res.status(200).json({ profile: profile.balance });
};

