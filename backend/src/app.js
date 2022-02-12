const readenv = require("dotenv").config();

if (readenv.error)
    throw "You need a .env file!";

const express = require("express");
const mongoose = require('mongoose');

const app = express();
const port = 8000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/register", (req, res) => {
    res.send("register");
});

// Main function - executed immediately
(async () => {
    await mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
})();
