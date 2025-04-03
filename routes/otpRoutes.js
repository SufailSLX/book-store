// // routes/otpRoutes.js
// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const { sendOTPEmail } = require("../utils/emailService");

// // OTP Verification Page Route
// router.get('/otp-verify', (req, res) => {
//     if (!req.session.signupEmail) {
//         return res.redirect('/signup');
//     }
//     res.render('otpPage', { email: req.session.signupEmail });
// });

// // Verify OTP Route
// // router.post("/verify-otp", async (req, res) => {
// //     const { email, otp } = req.body;

// //     try {
// //         const user = await User.findOne({ email });

// //         if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
// //             return res.json({ success: false, message: "Invalid OTP." });
// //         }

// //         // Mark user as verified
// //         user.isVerified = true;
// //         user.otp = undefined;
// //         user.otpExpires = undefined;
// //         await user.save();

// //         // Create session
// //         req.session.user = {
// //             id: user._id,
// //             email: user.email,
// //             name: user.name,
// //             role: user.role,
// //             isVerified: true
// //         };

        
// //         // Clear the signup email from session
// //         req.session.signupEmail = null;
// //         req.session.save(); // Ensure session is saved

// //         res.json({ 
// //             success: true, 
// //             message: "OTP verified successfully!",
// //             redirectUrl: "/dashboard" // Redirect to dashboard or any other page
// //         });
// //     } catch (error) {
// //         console.error("OTP Verification Error:", error);
// //         res.json({ success: false, message: "Something went wrong." });
// //     }
// // });

// router.post("/verify-otp", async (req, res) => {
//     const { email, otp } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
//             return res.json({ success: false, message: "Invalid OTP." });
//         }

//         // ✅ Mark user as verified
//         user.isVerified = true;
//         user.otp = undefined;
//         user.otpExpires = undefined;
//         await user.save();

//         // ✅ Store user session
//         req.session.user = {
//             id: user._id,
//             email: user.email,
//             name: user.name,
//             role: user.role,
//             isVerified: true
//         };

//         req.session.signupEmail = null; // ✅ Clear signup email session
//         req.session.save(); // ✅ Ensure session persistence

//         res.json({ 
//             success: true, 
//             message: "OTP verified successfully!",
//             redirectUrl: "/dashboard" 
//         });

//     } catch (error) {
//         console.error("OTP Verification Error:", error);
//         res.json({ success: false, message: "Something went wrong." });
//     }
// });



// // Resend OTP Route
// router.post("/resend-otp", async (req, res) => {
//     const { email } = req.body;
    
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.json({ success: false, message: "User not found." });
//         }

//         // Generate new OTP
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//         // Update user with new OTP
//         user.otp = otp;
//         user.otpExpires = otpExpires;
//         await user.save();

//         // Send new OTP email
//         await sendOTPEmail(email, otp);

//         res.json({ 
//             success: true, 
//             message: "New OTP has been sent to your email." 
//         });
//     } catch (error) {
//         console.error("Resend OTP Error:", error);
//         res.json({ success: false, message: "Failed to resend OTP." });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { sendOTPEmail } = require("../utils/emailService");

// OTP Verification Page Route
router.get('/otp-verify', (req, res) => {
    if (req.session.user && req.session.user.isVerified) {
        return res.redirect('/dashboard'); // Redirect if already verified
    }
    if (!req.session.signupEmail) {
        return res.redirect('/signup');
    }
    // Prevent browser caching
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.render('otpPage', { email: req.session.signupEmail });
});

// Verify OTP Route
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.json({ success: false, message: "Invalid OTP." });
        }

        // Mark user as verified
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Store user session
        req.session.user = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            isVerified: true
        };

        req.session.signupEmail = null; // Clear signup email session
        req.session.save(); // Ensure session persistence

        res.json({ 
            success: true, 
            message: "OTP verified successfully!",
            // redirectUrl: "/dashboard" 
            redirectUrl: "/api/auth/dashboard" 
        });
    } catch (error) {
        console.error("OTP Verification Error:", error);
        res.json({ success: false, message: "Something went wrong." });
    }
});

// Resend OTP Route
router.post("/resend-otp", async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Update user with new OTP
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Send new OTP email
        await sendOTPEmail(email, otp);

        res.json({ 
            success: true, 
            message: "New OTP has been sent to your email." 
        });
    } catch (error) {
        console.error("Resend OTP Error:", error);
        res.json({ success: false, message: "Failed to resend OTP." });
    }
});

module.exports = router;
