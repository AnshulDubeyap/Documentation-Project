const bcrypt = require("bcrypt");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

// register

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

// login

const LoginUser = async (req, res) => {

    // Destructuring
    const {email, password, role} = req.body;
    try {
        // Check if user exists
        const checkUser = await User.findOne({email});
        if (!checkUser) {
            return res.status(200).json({success: false, message: "User does not exist, please register"});
        }

        // Check if password is correct
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) {
            return res.status(200).json({success: false, message: "Password is incorrect"});
        }

        // create token
        const token = jwt.sign(
            {
                userId: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
            },
            "CLIENT_SECRET_KEY",
            {expiresIn: "1d"} //! Token will expire in 1 day
        );

        // Send token in Cookie
        res
            .cookie("token", token, {
                httpOnly: true, //! Cookie is not accessible via JavaScript
                secure: false,
            })
            .json({
                success: true,
                message: "User logged in successfully",
                user: {
                    id: checkUser._id,
                    email: checkUser.email,
                    role: checkUser.role,
                },
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

// Logout

const LogoutUser = async (req, res) => {
    try {
        res
            .clearCookie("token", {
                httpOnly: true, //! Cookie is not accessible via JavaScript
                secure: false,
            })
            .json({success: true, message: "User logged out successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

// Middlewares

const authMiddleware = async (req, res, next) => {
    // get the token from the cookie
    const token = req.cookies.token;

    // check if token exists
    if (!token) {
        return res.status(401).json({success: false, message: "Unauthorized"});
    }

    // verify the token
    try {
        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, message: "Unauthorized"});
    }
}

module.exports = {
    RegisterUser, LoginUser, LogoutUser, authMiddleware
}