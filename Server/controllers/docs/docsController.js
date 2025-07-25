const Document = require("../../models/Document");

const createDocument = async (req, res) => {
    console.log("📥 Incoming Request Body:", req.body);
    console.log("📥 Incoming Request User:", req.user);

    try {
        const {title, content, visibility, tags} = req.body;
        const userId = req.user.userId;

        const newDoc = new Document({
            title,
            content,
            visibility,
            author: userId,
            tags: tags || []
        });

        const savedDoc = await newDoc.save();
        res.status(201).json({
            success: true,
            message: "Document created successfully",
            data: savedDoc
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

const getDocumentsByAuthor = async (req, res) => {
    try {
        const authorId = req.user.userId;
        console.log("🔍 Incoming Request Author ID:", authorId);

        const documents = await Document.find({author: authorId}).populate({
            path: "author",
            model: "User",
            select: "name"
        });

        res.status(200).json({
            success: true,
            message: "Documents fetched successfully",
            data: documents
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

const getPublicDocuments = async (req, res) => {
    try {
        const documents = await Document.find({visibility: "public"}).populate({
            path: "author",
            model: "User",
            select: "name"
        });

        console.log("🌍 Public Documents Found:", documents);
        res.status(200).json({
            success: true,
            message: "Public documents fetched successfully",
            data: documents
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

// Get all private documents
const getPrivateDocuments = async (req, res) => {
    try {
        const documents = await Document.find({visibility: "private"}).populate({
            path: "author",
            model: "User",
            select: "name"
        }).populate({
            path: "tags",
            model: "User",
            select: "name"
        });

        console.log("🔐 Private Documents Found:", documents);
        res.status(200).json({
            success: true,
            message: "Private documents fetched successfully",
            data: documents
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

// Get a single document PRIVATE

const updateDocument = async (req, res) => {
    const {id} = req.params;
    const {title, content, visibility, tags} = req.body;
    const userId = req.user.userId;

    const document = await Document.findById(id);
    if (!document) {
        return res.status(404).json({success: false, message: "Document not found"});
    }

    if (document.author.toString() !== userId) {
        return res.status(403).json({success: false, message: "Unauthorized"});
    }

    document.title = title;
    document.content = content;
    document.visibility = visibility;
    document.tags = tags;
    const updatedDocument = await document.save();

    res.status(200).json({
        success: true,
        message: "Document updated successfully",
        data: updatedDocument
    });
};

//Get a single document that is public

const getSinglePublicDocument = async (req, res) => {
    try {
        const {id} = req.params;
        console.log("📥 Incoming request for public document with ID:", id);

        // Find the document with visibility public
        const doc = await Document.findOne({_id: id, visibility: "public"}).populate({
            path: "author",
            model: "User",
            select: "name"
        });

        if (!doc) {
            console.log("⚠️ Document not found or not public for ID:", id);
            return res.status(404).json({
                success: false,
                message: "Document not found or not public"
            });
        }

        console.log("✅ Public document found:", {
            id: doc._id,
            title: doc.title,
            author: doc.author?.name,
            visibility: doc.visibility
        });

        res.status(200).json({
            success: true,
            message: "Public document fetched successfully",
            data: doc
        });
    } catch (error) {
        console.error("❌ Error in getSinglePublicDocument:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get Single Private Document
const getSinglePrivateDocument = async (req, res) => {
    try {
        const {id} = req.params;
        console.log("📥 Incoming request for private document with ID:", id);

        // Find the document with visibility private
        const doc = await Document.findOne({_id: id, visibility: "private"}).populate({
            path: "author",
            model: "User",
            select: "name"
        }).populate({
            path: "tags",
            model: "User",
            select: "name"
        });

        if (!doc) {
            console.log("⚠️ Document not found or not private for ID:", id);
            return res.status(404).json({
                success: false,
                message: "Document not found or not private"
            });
        }

        console.log("✅ Private document found:", {
            id: doc._id,
            title: doc.title,
            author: doc.author?.name,
            visibility: doc.visibility
        });

        res.status(200).json({
            success: true,
            message: "Private document fetched successfully",
            data: doc
        });
    } catch (error) {
        console.error("❌ Error in getSinglePrivateDocument:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const deleteDocument = async (req, res) => {
    const {id} = req.params;
    const userId = req.user.userId;

    const document = await Document.findById(id);
    if (!document) {
        return res.status(404).json({success: false, message: "Document not found"});
    }

    if (document.author.toString() !== userId) {
        return res.status(403).json({success: false, message: "Unauthorized"});
    }

    await document.deleteOne();
    res.status(200).json({
        success: true,
        message: "Document deleted successfully"
    });
};

module.exports = {
    createDocument,
    getDocumentsByAuthor,
    updateDocument,
    deleteDocument,
    getPublicDocuments,
    getSinglePublicDocument,
    getPrivateDocuments,
    getSinglePrivateDocument
};