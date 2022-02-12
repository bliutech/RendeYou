const readenv = require("dotenv").config();

if (readenv.error)
    throw "You need a .env file!";

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = 8000;

// Enable CORS from any origin - change before deployment!
app.use(cors());

// Parse request bodies as JSON
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/register", (req, res) => {
    console.log(req.body);
    res.send({ register: "Success", username: req.body["username"] });
});

// Main function - executed immediately
(async () => {
    await mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
})();
