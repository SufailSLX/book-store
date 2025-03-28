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
        default: "user",
    },
});

module.exports = mongoose.model("User", UserSchema);
