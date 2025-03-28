// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('express-session'); // Session management
// const passport = require("passport");

// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const bookRoutes = require('./routes/bookRoutes');
// const pageRoutes = require('./routes/pageRoutes');
// const wishlistRoutes = require("./routes/wishlistRoutes");
// const readRoutes = require("./routes/readRoutes");

// const app = express();
// const PORT = process.env.PORT || 3333;

// // ✅ Session Setup
// app.use(session({
//     secret: process.env.SESSION_SECRET || 'your-secret-key',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production', 
//         maxAge: 1000 * 60 * 60 * 24 
//     }
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// // ✅ Cache Control Middleware
// app.use((req, res, next) => {
//     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
//     next();
// });

// // ✅ Set EJS as View Engine
// app.set('view engine', 'ejs');
// app.set('views', './views');
// app.use(express.static('public'));
// app.use('/uploads', express.static('uploads'));

// // ✅ Middleware Setup (Order is Important)
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json()); //express.json()

// // ✅ Routes
// app.use('/', pageRoutes); // Load UI routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/books', bookRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/", readRoutes);

// // ✅ Connect to MongoDB  //
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('✅ Connected to MongoDB'))
//     .catch(err => {
//         console.error('❌ MongoDB connection error:', err.message);
//         process.exit(1);
//     });

// // ✅ Debugging: Print All Registered Routes
// // console.log("✅ Available Routes:");
// // app._router.stack.forEach(layer => {
// //     if (layer.route) {
// //         console.log(`${Object.keys(layer.route.methods)[0].toUpperCase()} ${layer.route.path}`);
// //     }
// // });

// // ✅ Start Server
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
require("./config/passport"); // ✅ Require the passport config file

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require('./routes/adminRoutes');
const bookRoutes = require("./routes/bookRoutes");
const pageRoutes = require("./routes/pageRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const readRoutes = require("./routes/readRoutes");

const app = express();
const PORT = process.env.PORT || 3333;

// ✅ Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Middleware Setup
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Set EJS as View Engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// ✅ Routes
app.use("/", pageRoutes);
app.use("/api/auth", authRoutes); // ✅ Google OAuth now works here
app.use("/api/users", userRoutes);
app.use('/admin', adminRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/", readRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
