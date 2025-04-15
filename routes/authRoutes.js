const express = require('express');
const passport = require("passport");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const Book = require('../models/Book');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ensureAuth, ensureGuest,  ensureVerified } = require('../middleware/authMiddleware');
const { sendVerificationEmai,sendOTPEmail } = require("../utils/emailService");

require("../config/passport");
require("dotenv").config();

// ✅ Configure Multer for image upload
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ✅ Google OAuth Login Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// ✅ Google OAuth Callback Route
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    async (req, res) => {
        try {
            console.log("✅ Google OAuth Callback Hit!");
            console.log("🔹 Google User Profile:", req.user);

            let user = await User.findOne({ email: req.user.email });

            if (!user) {
                user = new User({
                    googleId: req.user.id,
                    name: req.user.displayName,
                    email: req.user.email,
                    password: "",
                    role: "user",
                });
                await user.save();
            } else if (!user.googleId) {
                // ✅ If user exists but has no googleId, update it
                user.googleId = req.user.id;
                await user.save();
            }

            // ✅ Create JWT Token
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie("token", token, { httpOnly: true });
            req.session.user = user; // ✅ Store session

            console.log("✅ User Logged In:", user.email);
            return res.redirect("/api/auth/dashboard"); 
        } catch (error) {
            console.error("❌ Google Auth Error:", error.message);
            return res.redirect("/login");
        }
    }
);


// ✅ User Signup Route

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists and is verified
        let user = await User.findOne({ email });
        if (user && user.isVerified) {
            return res.status(400).json({ success: false, message: "Email already exists and is verified" });
        }

        // If session exists for this email
        if (req.session.signupEmail === email) {
            return res.status(400).json({ success: false, message: "OTP already sent to your email" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Create or update user with OTP
        if (!user) {
            user = new User({ 
                name, 
                email, 
                password: hashedPassword, 
                isVerified: false,
                otp,
                otpExpires
            });
        } else {
            user.otp = otp;
            user.otpExpires = otpExpires;
            user.password = hashedPassword;
        }

        await user.save();

        // Store email in session for verification
        req.session.signupEmail = email;
        req.session.save();

        // Send OTP Email
        await sendOTPEmail(email, otp);

        res.status(200).json({ 
            success: true, 
            message: "OTP sent to your email", 
            redirect: "/otp-verify" 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// OTP Verification Page Route
router.get('/otp-verify', (req, res) => {
    if (!req.session.signupEmail) {
        return res.redirect('/signup');
    }
    res.render('otpPage', { email: req.session.signupEmail });
});

// In the verify-otp route
router.post('/verify-otp', async (req, res) => {
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

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role, isVerified: true }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // Set cookie and session
        res.cookie("token", token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        
        req.session.user = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            isVerified: true
        };

        // Clear signup email from session
        req.session.signupEmail = null;
        await req.session.save();

        res.json({ 
            success: true, 
            message: "OTP verified successfully!",
            redirect: "/api/auth/dashboard"
        });
    } catch (error) {
        console.error("OTP Verification Error:", error);
        res.json({ success: false, message: "Something went wrong." });
    }
});

// Dashboard route with cache control
router.get('/dashboard', ensureAuth, ensureVerified, async (req, res) => {
    try {
        // Extra verification
        if (!req.session.user?.isVerified) {
            return res.redirect('/otp-verify');
        }

        const books = await Book.find().limit(5);
        
        // Set no-cache headers
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        
        res.render('dashboard', {
            user: req.session.user,
            books: books
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.redirect('/login');
    }
});

// Resend OTP Route
router.post('/resend-otp', async (req, res) => {
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

// Email Verification Route
router.get("/verify/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        // Verify User
        await User.findOneAndUpdate({ email }, { isVerified: true });

        res.redirect("/dashboard"); // Redirect to the user's dashboard
    } catch (error) {
        console.error("Verification error:", error);
        res.status(400).send("Invalid or expired token.");
    }
});


// Admin Login Route
router.post("/admin/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const admin = await User.findOne({ email, role: "admin" });
        if (!admin) {
            return res.status(401).send("Admin not found!");
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).send("Incorrect password!");
        }

        // Store session
        req.session.user = {
            id: admin._id,
            email: admin.email,
            role: admin.role
        };

        res.redirect("/admin/dashboard"); // Redirect to Admin Dashboard
    } catch (error) {
        res.status(500).send("Server error!");
    }
});

// Admin Logout Route
router.get("/admin/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out!");
        }
        res.redirect("/admin"); // Redirect to admin login page
    });
});



// ✅ User Login Route
router.get('/login', ensureGuest, (req, res) => {
    if (req.session.user) {
        return res.redirect('/api/auth/dashboard');
    }
    res.render('login'); // Render the login page
});

// router.post('/login', ensureGuest, async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and password are required" });
//         }

//         const user = await User.findOne({ email });

//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.cookie("token", token, { httpOnly: true });
//         req.session.user = user;

//         return res.redirect('/api/auth/dashboard');

//     } catch (error) {
//         console.error("❌ Login error:", error.message);
//         return res.status(500).json({ message: "Server error" });
//     }
// });

router.post('/login', ensureGuest, async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.redirect('/login?error=Email and password are required');
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.redirect('/login?error=Email not found');
        }

        if (user.isBlocked) {
            return res.status(403).render("login", { error: "Your account has been blocked." });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.redirect('/login?error=Incorrect password');
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, { httpOnly: true });
        req.session.user = user;

        return res.redirect('/api/auth/dashboard');

    } catch (error) {
        console.error("❌ Login error:", error.message);
        return res.redirect('/login?error=Server error. Please try again later.');
    }
});

// ✅ User Logout Route
router.get('/logout', (req, res) => {
    res.clearCookie("token");
    req.session.destroy((err) => {
        if (err) {
            console.error("❌ Session destruction error:", err);
            return res.status(500).json({ message: "Logout failed" });
        }
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        return res.redirect('/login');
    });
});


router.get('/check-session', (req, res) => {
    res.json({
        authenticated: !!req.session.user,
        verified: req.session.user?.isVerified
    });
});


module.exports = router;
