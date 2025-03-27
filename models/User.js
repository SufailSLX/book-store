// // const mongoose = require("mongoose");

// // const userSchema = new mongoose.Schema({
// //     name: { type: String, required: true },
// //     email: { type: String, required: true, unique: true },
// //     password: { type: String, required: true },
// //     role: { type: String, enum: ['user', 'admin'], default: 'user' },
// //     isBlocked: { type: Boolean, default: false }
// // }, { timestamps: true });

// // module.exports = mongoose.model('User', userSchema);

// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     googleId: {
//         type: String, // Store Google ID for OAuth users
//         unique: true,
//         sparse: true, // Allows `null` for non-Google users
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: function () {
//             return !this.googleId; // Require password only if not using Google OAuth
//         },
//     },
//     role: {
//         type: String,
//         default: "user",
//         enum: ["user", "admin"],
//     },
// });

// module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String, 
        unique: true,
        sparse: true, // ✅ Allows `null` for non-Google users
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId; 
        },
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
});

module.exports = mongoose.model("User", UserSchema);
