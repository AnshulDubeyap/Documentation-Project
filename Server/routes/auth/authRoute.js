const express = require("express");
const router = express.Router();
const {
    RegisterUser,
    LoginUser,
    LogoutUser,
    authMiddleware
} = require("../../controllers/auth/authController");

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "User is authenticated",
        user: {
            userName: user.userName,
            email: user.email,
            userId: user.userId,
            role: user.role,
        },
    });
});

module.exports = router;
