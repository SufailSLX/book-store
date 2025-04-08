const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOTPEmail = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: `"Book Cloud" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP Code",
            html: `
                <p>Your One-Time Password (OTP) is:</p>
                <h2>${otp}</h2>
                <p>This OTP is valid for 10 minutes.</p>
            `,
        });
        console.log(`✅ OTP email sent to ${email} with OTP: ${otp}`);
    } catch (error) {
        console.error("❌ Error sending OTP email:", error);
    }
};

module.exports = { sendOTPEmail };