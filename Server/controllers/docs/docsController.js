const Document = require("../../models/Document");

const createDocument = async (req, res) => {

    // Log the incoming request
    console.log("📥 Incoming Request Body:", req.body);

    // Log the user from auth middleware
    console.log("User from auth middleware:", req.user);


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

module.exports = {createDocument};
