const User = require("../../models/user");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

module.exports = {getAllUsers};
