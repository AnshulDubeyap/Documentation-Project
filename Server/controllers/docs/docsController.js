const Document = require("../../models/Document");

const createDocument = async (req, res) => {

    // Log the incoming request
    console.log("📥 Incoming Request Body:", req.body);

    // Log the user from auth middleware
    console.log("📥 Incoming Request User:", req.user);


    try {
        const {title, content, visibility, tags} = req.body;
        const userId = req.user.userId; // assuming auth middleware sets req.user

        // Create a new document
        const newDoc = new Document({
            title,
            content,
            visibility,
            author: userId,
            tags: tags || []
        });

        // Save the document
        const savedDoc = await newDoc.save();

        // Return the saved document and a success message
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

// Fetch the all documents created by the author

const getDocumentsByAuthor = async (req, res) => {
    try {

        // Get the author ID from the request
        const authorId = req.user.userId;
        console.log("🔍 Incoming Request Author ID:", authorId);

        // Find all documents created by the author
        const documents = await Document.find({author: authorId});

        // Return the documents
        res.status(200).json({
            success: true,
            message: "Documents fetched successfully",
            data: documents
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

// Fetch the all documents that are public

const getPublicDocuments = async (req, res) => {
    try {
        // Find all public documents
        const documents = await Document.find({visibility: "public"});
        console.log("🌍 Incoming Request Public Documents:", documents);

        // Return the documents
        res.status(200).json({
            success: true,
            message: "Public documents fetched successfully",
            data: documents
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

// Fetch the all documents that are private but with specific tags included

const getPrivateDocumentsWithTags = async (req, res) => {
    try {
        // Get the current user's ID from the auth middleware
        const userId = req.user.userId;
        console.log("🔐 Fetching private documents for tagged user:", userId);

        // Find all private documents where the current user is tagged
        const documents = await Document.find({
            visibility: "private",
            tags: userId
        });

        // Return the documents
        res.status(200).json({
            success: true,
            message: "Private tagged documents fetched successfully",
            data: documents
        });
    } catch (error) {
        console.error("Error fetching private tagged documents:", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};


// Author can update a document

const updateDocument = async (req, res) => {
    // get the document id we want to update
    const {id} = req.params;
    console.log("🔄 Incoming Update Request ID:", id);


    // get the new data
    const {title, content, visibility, tags} = req.body;
    console.log("🔄 Incoming Update Data:", req.body);

    // update the document
    const updatedDocument = await Document.findByIdAndUpdate(id, {
        title,
        content,
        visibility,
        tags
    }, {new: true});

    // save the updated document
    await updatedDocument.save();

    // return the updated document
    res.status(200).json({
        success: true,
        message: "Document updated successfully",
        data: updatedDocument
    });
}


// Author can delete a document

const deleteDocument = async (req, res) => {
    // get the document id we want to delete
    const {id} = req.params;
    console.log("🗑️ Incoming Delete Request ID:", id);

    // delete the document
    const deletedDocument = await Document.findByIdAndDelete(id);

    // return the deleted document
    res.status(200).json({
        success: true,
        message: "Document deleted successfully",
        data: deletedDocument
    });

}

module.exports = {
    createDocument,
    getDocumentsByAuthor,
    updateDocument,
    deleteDocument,
    getPublicDocuments,
    getPrivateDocumentsWithTags
}