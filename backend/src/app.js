const readenv = require("dotenv").config();

if (readenv.error)
    throw "You need a .env file!";

const mongoose = require("mongoose");

const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

const { User } = require("./schemas");
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
    });
    if (user) { //if the user is a valid user
        req.session.userId = user._id; //then createa new session ID and return that user
        res.send(stripUser(user.toObject()));
    } else { //otherwise, return an error status
        res.status(403);
        res.send({error: "Forbidden"});
    }
});

app.post("/logout", async(req, res) => {
    const id = req.params.id;  //check to see if a valid user is logged in
    const user = await User.findById(id).lean();
    if (user) { //if they area valid user, then destroy their session
        req.session.destroy();
        res.status(200);
    } else { //otherwise, send 409 error
        res.status(409);
    }
});

app.get("/event/:id", async(req, res) => {
    const eventID = req.params.id;
    const event = await Event.findById(eventID).lean(); 
    if (event) { //make sure the event is valid, and if it is, send it
        res.send(event);
    } else { //otherwise, send a 404 error
        res.status(404);
    }
});

app.put("/event/:id", async(req, res) => {
    const eventID = req.params.id; 
    const event = await Event.findById(eventID).lean(); //retrieve the event to be modified
    const changes = req.body;

    //need to make sure the changes are valid (i.e. the date is valid, etc.)
    const title = req.body.title;
    if (!title) {
        res.status(400);
        res.send({error: "Event name is empty"});
        return;
    }
    if (/\s/.test(title)) {
        res.status(400);
        res.send({error: "Event name contains white space"});
        return;
    }

    //make sure the event is valid. If it is, set the input event to contain the needed changes
    if (event) {
        event.set(changes);
        try {
            await Event.save(); //save it
            res.status(200); //send a 200 status if it does save
        } catch (err) {
            res.status(403); //and if it doesn't save, send a 403 error
        }
    } else {
        res.status(404); //send a 404 error if the event is invalid
    }
});

app.delete("/event/:id", async(req, res) => {
    const eventID = req.params.id;
    const event = await Event.findById(eventId).lean();
    if (event) { //if the event is valid, delete it
        Event.findByIdAndDelete(eventID, function(err) { //if there is some error in deleting it, then send a 403 error status
            if (err) {
                res.status(403);
            } else {
                res.status(200); //otherwise, send a successful 200 status
            }
        });
    } else {
        res.status(404); //send a 404 status if event wasn't found
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
