const { validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


exports.createProfile = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    
    // create profile
    const { name, Bio,avatar,phone } = req.body;

    const profile = new Profile({
        name,
        Bio,
        avatar,
        phone
    });
    try {
        await profile.save();
    } catch (err) {
        console.log(err.message);
        
        return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ profile });

};