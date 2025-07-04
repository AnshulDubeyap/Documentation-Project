const bcrypt = require("bcrypt");
const User = require("../../models/user");


const RegisterUser = async (req, res) => {
    try {
        // Destructuring
        const {name, email, password, role} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(200).json({success: false, message: "User already exists"});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Save user
        await newUser.save();

        // Log user
        console.log("New user created:", newUser);

        // Send response
        res.status(201).json({success: true, message: "User created successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

module.exports = {
    RegisterUser
}