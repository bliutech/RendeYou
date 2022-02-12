const readenv = require("dotenv").config();

if (readenv.error)
    throw "You need a .env file!";

const mongoose = require("mongoose");

const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

const { User } = require("./schemas");
const { hash, genSalt } = require("./crypt");

const session = require("express-session");
const sessionLifetime = 1000 * 60 * 60; // One hour

const cookieParser = require("cookie-parser");

//==============================================================================
// Express app settings
// These define custom behaviors such as how Express expects to parse input.

// Allow CORS
// TODO: Currently allows requests from any origin - change before production!
app.use(cors());

// Parse request bodies as JSON
app.use(express.json());

// Parse cookies from headers
app.use(cookieParser());

// Use session manager
// TODO: Install a session store like connect-mongodb-session before production!
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: sessionLifetime }
}));

//==============================================================================
// API routes

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/register", async (req, res) => {
    const username = req.body["username"];
    const password = req.body["password"];

    // Validate username and password
    if (!username || !password) {
        res.status(400) // 400 Bad Request
        res.send({ register: "fail", reason: "Username or password are empty." });
        return;
    }

    // Check for username conflict
    const user = await User.findOne({ username: username });
    if (user) {
        res.status(409); // 409 Conflict
        res.send({ register: "fail", reason: "Username already exists." });
        return;
    }

    const salt = genSalt();
    const passwordHash = hash(password, salt);
    const newUser = new User({
        username: username,
        passwordHash: passwordHash,
        salt: salt
    });
    await newUser.save();

    // Create a new session on registration
    req.session.userId = newUser._id;

    res.send({ register: "success" });
});

//==============================================================================

async function main() {
    await mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

main();
