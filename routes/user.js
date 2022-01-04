const express = require('express');
const router = express.Router();


const {auth} = require ('../app/middleware/auth');
const { loginValidation} = require ('../app/middleware/profileValidation');
const {createProfile} = require('../app/controllers/User/createProfile')
const {getUserProfile} = require('../app/controllers/User/getUserProfile')


router.post ('/create-profile',[auth,loginValidation], createProfile);
router.get('/:profileId/profile', getUserProfile);



module.exports = router