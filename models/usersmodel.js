const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 3,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
    photos: String,
    phoneno: Number
});

usersSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    
    next();
});

usersSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const HallUsers = mongoose.model('HallUsers', usersSchema);

module.exports = HallUsers;
