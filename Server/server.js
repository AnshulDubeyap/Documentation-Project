const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Importing the routes
const authRoute = require("./routes/auth/authRoute.js");


const app = express();
const PORT = 5000;

// Configuring the database
mongoose.connect("mongodb+srv://dubeyanshul2204:67kqkZWcI1BYB2J7@cluster0.xzgtccc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("MongoDB is Connected")
}).catch((error) => {
    console.log(error)
})

// Configuring the cors
app.use(
    cors({
        origin: ["http://localhost:5176"],
        credentials: true,
    })
);

// Middlewares and cookie-parser
app.use(cookieParser());
app.use(express.json());

// Using the routes
app.use("/api/auth", authRoute)


app.listen(PORT, () => {
    console.log("The server is up and running at PORT : " + PORT)
})