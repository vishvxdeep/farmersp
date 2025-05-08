const mongoose = require('mongoose');


// name, email, password, phone, city, question1, question2

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        default: ''
    },
    question1: {
        type: String,
        required: true,
    },
    question2: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending',
    }
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
