require('dotenv').config();
const nodemailer = require('nodemailer');

const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

module.exports = {
    sendMail: (req, res) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_ADDRESS,
                pass: EMAIL_PASSWORD
            }
        })
        const mailOptions = {
            from: EMAIL_ADDRESS,
            to: `${req.body.email}`,
            subject: `${req.body.name}`,
            text: `${req.body.message}`,
            html: `${req.body.html_message}`,
            replyTo: EMAIL_ADDRESS
        }
        transporter.sendMail(mailOptions, function (err, res) {
            if (err) {
                console.error('there was an error: ', err);
            } else {
                console.log('here is the res: ', res)
            }
        })
    }
}