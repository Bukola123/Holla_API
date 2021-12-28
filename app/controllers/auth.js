const { validationResult } = require('express-validator');
const {bcrypt} = require('bcrypt');
const User = require('../models/User');

exports.registerUser = async function (req,res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json ({
            errors: errors.array()
        });
    }
    const {email, password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const harshedPassword = await bcrypt.hash(password,salt);
    const user = new User ({
        email,
        password: harshedPassword
    });
    try{
        await user.save();
    }catch (err){
        console.err.code;
        res.status(500).json({message:'internal server error'});
    }
    res.status(201).json({message: 'Registeration Suuceesful'})
}