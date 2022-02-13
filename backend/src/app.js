const readenv = require("dotenv").config();

if (readenv.error)
    throw "You need a .env file!";

const mongoose = require("mongoose");

const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

const { User } = require("./schemas");
const { stripUser, escapeRegex, emailRegex } = require("./util");
const { hash, genSalt } = require("./crypt");

const session = require("express-session");
const sessionLifetime = 1000 * 60 * 60; // 1h

//==============================================================================
// Express app settings
// These define custom behaviors such as how Express expects to parse input.

// Allow CORS
// TODO: Currently allows requests from any origin - change before production!
app.use(cors());

// Parse request bodies as JSON
app.use(express.json());

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
    const username = req.body.username;
    const password = req.body.password;

    // Validate username and password
    if (!username || !password) {
        res.status(400) // 400 Bad Request
        res.send({ error: "Username or password is empty" });
        return;
    }

    if (/\s/.test(username)) {
        res.status(400) // 400 Bad Request
        res.send({ error: "Username contains whitespace" });
        return;
    }

    // Check for username conflict
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        res.status(409); // 409 Conflict
        res.send({ error: "Username already exists" });
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
    req.session.id = newUser._id;

    res.send(stripUser(newUser.toObject()));
});

app.get("/user", async (req, res) => {
    let users = User.find();

    const ids = req.query.ids;
    if (ids) {
        const idArray = ids.split(",");

        // Validate ids
        for (const id of idArray) {
            if (!/[0-9a-f]{24}/.test(id)) {
                res.status(400); // 400 Bad Request
                res.send({ error: "ids are not not all 24-digit hexadecimal strings" });
                return;
            }
        }

        users = users.where("_id").in(idArray);
    }

    const names = {
        username: req.query.username,
        firstName: req.query.first,
        lastName: req.query.last
    };

    for (const i in names) {
        if (names[i]) {
            const regex = new RegExp("^" + escapeRegex(names[i]), "i");
            users = users.where(i).regex(regex);
        }
    }

    users = await users.lean();

    res.send(users);
});

app.get("/user/:id", async (req, res) => {
    const id = req.params.id;

    // Validate id
    if (!/[0-9a-f]{24}/.test(id)) {
        res.status(400); // 400 Bad Request
        res.send({ error: "id is not a 24-digit hexadecimal string" });
        return;
    }

    // .lean() makes the query return a JS object instead of a document
    const user = await User.findById(id).lean();
    if (user) {
        res.send(stripUser(user));
    } else {
        res.status(404); // 404 Not Found
        res.send();
    }
});

app.get("/user/me", checkAuth, async(req, res) => {
    const id = req.session.id;

    // .lean() makes the query return a JS object instead of a document
    const user = await User.findById(id).lean();
    if (user) {
        res.send(stripUser(user));
    } else {
        res.status(404); // 404 Not Found
        res.send();
    }
});

app.put("/user/me", checkAuth, async (req, res) => {
    const id = req.session.id;
    const user = await User.findById(id);

    const update = req.body;

    // Check first last name are valid
    if (!/[A-Za-z]/.test(update.firstName)) {
        res.status(400) // 400 Bad Request
        res.send({ error: "First name contains non-alpha characters or whitespace" });
        return;
    } else if (!/[A-Za-z]/.test(update.lastName)){
        res.status(400) // 400 Bad Request
        res.send({ error: "Last name contains non-alpha characters or whitespace" });
        return;
    }
    // Checks if email is valid
    if (emailRegex.test(update.email)) {
        res.status(400) // 400 Bad Request
        res.send({ error: "Not a valid email" });
        return;
    }
    // Checks if user ID has been modified
    if (user.id != update.id) {
        res.status(403) // 403 Forbidden
        res.send({ error: "User ID cannot be modified" });
        return;
    }

    // Some validations, kinda-unsafe!
    Object.assign(user, update);

    await user.save();
    res.send();
});

app.delete("/user/me", checkAuth, async (req, res) => {
    await User.findByIdAndDelete(req.session.id);
    req.session.destroy();
    res.send();
});

//==============================================================================
// Route handlers

function checkAuth(req, res, next) {
    if (req.session.id) {
        next();
    } else {
        res.status(403); // 403 Forbidden
        res.send();
    }
}

//==============================================================================

async function main() {
    await mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

main();
