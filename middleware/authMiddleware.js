// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "Access Denied. No token provided." });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach user data to request
//         next();
//     } catch (error) {
//         res.status(403).json({ message: "Invalid token." });
//     }
// };

// const ensureAuth = (req, res, next) => {
//     if (!req.user) return res.redirect('/login'); // Redirect to login if not authenticated
//     next();
// };

// console.log("Exported Middleware Functions:", module.exports);  // Debugging

// module.exports = { verifyToken, ensureAuth }; // ✅ Ensure both are exported


const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token." });
    }
};

const ensureAuth = (req, res, next) => {
    if (!req.user) return res.redirect('/login'); // Redirect to login if not authenticated
    next();
};

// ✅ Correct way to export both functions
module.exports = { verifyToken, ensureAuth };

// Debugging Log (Check if exports are correct)
console.log("Exported Middleware Functions:", module.exports);
