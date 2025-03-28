exports.ensureAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== "admin") {
        return res.redirect("/admin"); // Redirect to admin login if not authenticated
    }
    next();
};
