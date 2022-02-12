const readenv = require("dotenv").config();

if (readenv.error)
    throw "You need a .env file!";

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const cors = require("cors");
const { User } = require("./schemas");
const crypt = require("./crypt");

// Enable CORS from any origin - change before deployment!
app.use(cors());

// Parse request bodies as JSON
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/register", async (req, res) => {
    const username = req.body["username"];
    const password = req.body["password"];

    // Check for username conflict
    const user = await User.findOne({ username: username });
    if (!user) {
        const salt = crypt.genSalt();
        const passwordHash = crypt.hash(password, salt);
        const newUser = new User({
            username: username,
            passwordHash: passwordHash,
            salt: salt
        });
        await newUser.save();
        res.send({ register: "success" });
    } else {
        res.status(409); // 409 Conflict
        res.send({ register: "fail", reason: "Username already exists" });
    }
});

async function main() {
    await mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

main();
