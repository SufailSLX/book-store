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

// const ensureVerified = (req, res, next) => {
//     if (!req.session.user || !req.session.user.isVerified) {
//         return res.redirect("/login");
//     }
//     next();
// };

const ensureVerified = (req, res, next) => {
    if (!req.session.user || !req.session.user.isVerified) {
        if (req.session.user && !req.session.user.isVerified) {
            return res.redirect('/otp-verify');
        }
        return res.redirect("/login");
    }
    next();
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

    if (req.session.user || req.cookies.token) {
        return res.redirect('/api/auth/dashboard');
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

// module.exports = { verifyToken, ensureAuth, ensureGuest, isAdmin, ensureVerified };
module.exports = { 
    verifyToken, 
    ensureAuth, 
    ensureGuest, 
    isAdmin, 
    ensureVerified // Make sure this is included
};
