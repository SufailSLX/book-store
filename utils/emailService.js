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
        console.log(`✅ OTP email sent to ${email}`);
    } catch (error) {
        console.error("❌ Error sending OTP email:", error);
    }
};

const sendVerificationEmail = async (email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const verificationUrl = `${process.env.BASE_URL}/verify/${token}`;

    try {
        await transporter.sendMail({
            from: `"Book Cloud" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Please click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
        });
        console.log(`✅ Verification email sent to ${email}`);
    } catch (error) {
        console.error("❌ Error sending verification email:", error);
    }
};

module.exports = { sendOTPEmail, sendVerificationEmail };