const express = require("express");
const router = express.Router();

// Middlewares
const {
    authMiddleware
} = require("../../controllers/auth/authController");

const {
    createDocument
} = require("../../controllers/docs/docsController");

router.post("/create", authMiddleware, createDocument);

module.exports = router;