const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'keith65609@gmail.com',
            pass: 'rhmookvqvxnwbkev'
        }
    });

    // Read HTML template
    const templatePath = path.join(__dirname, '/emailTemplate.html');
    let template = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders with actual data
    template = template.replace('{{recipientName}}', options.recipientName)
                       .replace('{{newUserName}}', options.newUserName)
                       .replace('{{newUserAge}}', options.newUserAge)
                       .replace('{{newUserGender}}', options.newUserGender)
                       .replace('{{newUserCountry}}', options.newUserCountry)
                       .replace('{{newUserCity}}', options.newUserCity);
                       

    const mailOptions = {
        from: 'keith65609@gmail.com',
        to: options.email,
        subject: options.subject,
        html: template
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

