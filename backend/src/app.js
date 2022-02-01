const readenv = require("dotenv").config();

if (readenv.error)
    throw "You need a .env file! An empty one is fine for now.";

const express = require("express");
const db = require("./db.js");

const app = express();
const port = 8000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Main function - executed immediately
(async () => {
    await db.connect();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
})();
