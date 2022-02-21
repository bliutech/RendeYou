const readenv = require("dotenv").config();

if (readenv.error)
    throw "You need a .env file!";

const mongoose = require("mongoose");

const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

const { User, Event } = require("./schemas");
const { stripUser, escapeRegex } = require("./util");
const { hash, genSalt } = require("./crypt");

const session = require("express-session");
const sessionLifetime = 1000 * 60 * 60; // 1h

//==============================================================================
// Express app settings
// These define custom behaviors such as how Express expects to parse input.

// Allow CORS
// TODO: Currently allows requests from any origin - change before production!
let corsOptions;
if (process.env.ENV == "dev") {
    corsOptions = { origin: "http://localhost:3000" };
} else if (process.env.ENV == "production") {
    // Production options
}
app.use(cors(corsOptions));

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
    res.sendFile("test-frontend.html", { root: "." });
});
app.get('/', (req, res) => {
    res.send("Hello World");
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
    req.session.userId = newUser._id;

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

app.post("/login", async(req, res) => {
    //get the username and password of the user trying to login
    const username = req.body.username;
    const password = req.body.password;
    //retrieve that user from database
    const user = await User.findOne({ 
        username: username,
        password: password
    }).lean();
    if (user) { //if the user is a valid user
        req.session.userId = user._id; //then createa new session ID and return that user
        res.send(stripUser(user));
    } else { //otherwise, return an error status
        res.status(403);
        res.send();
    }
});

app.post("/logout", async(req, res) => {
    const id = req.session.userId;
    const user = await User.findById(id).lean();
    if (user) {
        req.session.destroy();
        res.status(200);
        res.send();
    } else {
        res.status(409);
        res.send();
    }
});



//==============================================================================

async function main() {
    await mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });

}

main();
