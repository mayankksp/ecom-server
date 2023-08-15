const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: String,
    password: String,
    email: String,
    emailVerified: Boolean,
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
    isSuperAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;