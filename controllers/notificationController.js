const User = require('../models/userModel');
const sendEmail = require('../utils/email');

exports.notifyUsers = async (newUser) => {
    try {
        const users = await User.find();

        users.forEach(async (user) => {
            await sendEmail({
                email: user.email,
                subject: 'New User Profile Created!',
                recipientName: user.FirstName,
                newUserName: newUser.FirstName,
                newUserAge: newUser.age,
                newUserGender: newUser.gender,
                newUserCountry: newUser.country,
                newUserCity: newUser.city
                
            });
        });
    } catch (err) {
        console.error('Error sending notification emails:', err);
    }
};
