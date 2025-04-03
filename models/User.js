// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     googleId: {
//         type: String, 
//         unique: true,
//         sparse: true, // ✅ Allows `null` for non-Google users
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
//             return !this.googleId; 
//         },
//     },
//     role: {
//         type: String,
//         default: "user",
//         enum: ["user", "admin"],
//         default: "user",
//     },
//     isVerified: { 
//         type: Boolean, 
//         default: false 
//     },
// });

// module.exports = mongoose.model("User", UserSchema);

// NEW const 
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String, 
        unique: true,
        sparse: true,
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
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    }
});

module.exports = mongoose.model("User", UserSchema);