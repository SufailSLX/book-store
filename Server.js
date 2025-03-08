require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const pageRoutes = require('./routes/pageRoutes');
const { verifyToken } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Set EJS as View Engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Properly added
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/', pageRoutes); // Load UI routes first
app.use('/api/auth', authRoutes);
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/books', bookRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));


    console.log("Available routes:");
console.log(app._router.stack.map(r => r.route && r.route.path).filter(Boolean));


// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
