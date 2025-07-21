const express = require("express");
const router = express.Router();

// Controller import
const {getAllUsers} = require("../../controllers/user/userController");

// Route for fetching all users
router.get("/getallusers", getAllUsers);

// Export router
module.exports = router;
