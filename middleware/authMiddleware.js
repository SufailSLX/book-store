
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const verifyToken = (req, res, next) => {
//     let token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header

//     // ✅ Try to get token from cookies if not in headers
//     if (!token && req.cookies) {
//         token = req.cookies.token;
//     }

//     if (!token) {
//         return res.status(401).json({ message: "Access Denied. No token provided." });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach user data to request
//         next();
//     } catch (error) {
//         console.error("Token verification error:", error.message);
//         res.status(403).json({ message: "Invalid token." });
//     }
// };

// const ensureAuth = (req, res, next) => {
//     if (!req.user) {
//         return res.redirect('/login'); // Redirect to login if not authenticated
//     }
//     next();
// };

// // ✅ New Middleware: Check if User is Admin
// const isAdmin = (req, res, next) => {
//     if (req.user?.role !== 'admin') {
//         return res.status(403).json({ message: "Access Denied. Admins only." });
//     }
//     next();
// };

// // ✅ Export all middleware functions
// module.exports = { verifyToken, ensureAuth, isAdmin };

// // Debugging Log (Check if exports are correct)
// console.log("Exported Middleware Functions:", module.exports);
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header

    // ✅ Try to get token from cookies if not in headers
    if (!token && req.cookies) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        res.status(403).json({ message: "Invalid token." });
    }
};

const ensureAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }
    next();
};

// ✅ New Middleware: Check if User is Admin
const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: "Access Denied. Admins only." });
    }
    next();
};

// ✅ Export all middleware functions
module.exports = { verifyToken, ensureAuth, isAdmin };

// Debugging Log (Check if exports are correct)
console.log("Exported Middleware Functions:", module.exports);
