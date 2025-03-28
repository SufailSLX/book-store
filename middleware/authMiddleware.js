
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// const verifyToken = (req, res, next) => {
//     let token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//         res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
//         return res.redirect('/login');
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
//         next();
//     } catch (error) {
//         res.clearCookie("token");
//         req.session.destroy(err => {
//             if (err) {
//             console.error("Session destruction error:", err.message);
//             }
//             res.redirect('/login');
//         }); res.clearCookie("token");
//         res.redirect('/login');
//     }
// };

// const ensureAuth = (req, res, next) => {
//     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    
//     // Check session first, then fall back to token
//     if (req.session.user) {
//         return next();
//     }
    
//     // If no session but has token, verify it
//     if (req.cookies.token) {
//         try {
//             const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
//             req.session.user = decoded; // Create session from token
//             return next();
//         } catch (error) {
//             res.clearCookie("token");
//             return res.redirect('/login');
//         }
//     }
    
//     return res.redirect('/login');
// };

// const ensureGuest = (req, res, next) => {
//     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    
//     // Check if user is trying to access signup page specifically
//     if (req.path === '/signup' && (req.session.user || req.cookies.token)) {
//         return res.redirect('/dashboard');
//     }
    
//     // For login page
//     if (req.path === '/login' && (req.session.user || req.cookies.token)) {
//         return res.redirect('/dashboard');
//     }
    
//     next();
// };

// const isAdmin = (req, res, next) => {
//     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    
//     if (!req.session.user || req.session.user.role !== 'admin') {
//         if (req.accepts('html')) {
//             return res.redirect('/dashboard');
//         }
//         return res.status(403).json({ message: "Access Denied. Admins only." });
//     }
//     next();
// };

//     // middlewares/authMiddleware.js

// exports.ensureAdmin = (req, res, next) => {
//     if (!req.session || !req.session.user || req.session.user.role !== "admin") {
//         return res.redirect("/admin"); // Redirect to login if not authenticated
//     }
//     next();
// };


// module.exports = { verifyToken, ensureAuth, ensureGuest, isAdmin };

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
    let token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.session.user = decoded; // Keep session active
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        next();
    } catch (error) {
        res.clearCookie("token");
        req.session.destroy(err => {
            if (err) console.error("Session destruction error:", err.message);
            res.redirect('/login');
        });
    }
};

const ensureAuth = (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    if (req.session.user) {
        return next();
    }

    if (req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            req.session.user = decoded;
            return next();
        } catch (error) {
            res.clearCookie("token");
            return res.redirect('/login');
        }
    }

    return res.redirect('/login');
};

const ensureGuest = (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    if (req.path === '/signup' && (req.session.user || req.cookies.token)) {
        return res.redirect('/dashboard');
    }

    if (req.path === '/login' && (req.session.user || req.cookies.token)) {
        return res.redirect('/dashboard');
    }

    next();
};

const isAdmin = (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/admin'); // Redirect to admin login
    }
    next();
};

module.exports = { verifyToken, ensureAuth, ensureGuest, isAdmin };
