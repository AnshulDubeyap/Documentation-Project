const bcrypt = require("bcrypt");
const User = require("../../models/user");


const RegisterUser = async (req, res) => {
    try {
        // Destructuring
        const {name, email, password} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({success: false, message: "User already exists"});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Save user
        await newUser.save();

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