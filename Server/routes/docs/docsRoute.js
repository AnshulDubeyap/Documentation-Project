const express = require("express");
const router = express.Router();

// Middlewares
const {
    authMiddleware
} = require("../../controllers/auth/authController");

const {
    createDocument,
    updateDocument,
    deleteDocument,
    getDocumentsByAuthor,
    getPublicDocuments,
    getSinglePublicDocument,
    getPrivateDocuments,
    getSinglePrivateDocument
} = require("../../controllers/docs/docsController");

router.post("/create", authMiddleware, createDocument);
router.put("/update/:id", authMiddleware, updateDocument);
router.delete("/delete/:id", authMiddleware, deleteDocument);
router.get("/getall/author", authMiddleware, getDocumentsByAuthor);
router.get("/getpublic", getPublicDocuments);
router.get("/getpublic/:id", getSinglePublicDocument);
router.get("/getprivate", authMiddleware, getPrivateDocuments);
router.get("/getprivate/:id", authMiddleware, getSinglePrivateDocument);


module.exports = router;