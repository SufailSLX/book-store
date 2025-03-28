const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

mongoose.connect("mongodb+srv://webconnectslx:bookstoreslx@cluster0.lkd9j.mongodb.net/bookstoreslx", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const createAdmin = async () => {
    try {
        // Delete any existing admin to start fresh
        await Admin.deleteMany({ email: "admin@gmail.com" });

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = new Admin({
            email: "admin@gmail.com",
            password: hashedPassword
        });

        await admin.save();
        console.log("✅ Admin created successfully!");
    } catch (error) {
        console.error("❌ Error creating admin:", error);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
