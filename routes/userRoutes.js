

const express = require('express');
const User = require('../models/User');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Get all users (Admin only)
router.get('/', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ✅ Block/Unblock user (Admin only)
router.put('/block/:id', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ✅ Protected Route: Get User Dashboard
router.get('/dashboard', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.render('dashboard', { user }); // Render EJS page
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
