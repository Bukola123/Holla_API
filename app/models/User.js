const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
email: {
    type :string,
    required: true,
    unique: true},
password: {
    type: string,
    required: true
},
isActive: {
    type: Boolean,
    default: false
},
otp: {
    type: Number
},
profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
},
channels: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Channel'
    }
],
createdAt: {
    type: Date,
    default: Date.now
}
});


module.exports = mongoose.model('User', userSchema);