const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Hello world");
});

// connect MongoDB
mongoose
    .connect(
        `mongodb+srv://litimini:${process.env.MONGO_DB}@cluster0.byegi3e.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`
    )
    // promise
    .then(() => {
        console.log("Connect DB success!");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log("Server is running in port: ", port);
});
