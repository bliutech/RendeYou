const readenv = require("dotenv").config();

if (readenv.error)
    throw "You need a .env file!";

const mongoose = require("mongoose");

const express = require("express");
const app = express();
const port = parseInt(process.env.PORT);
const cors = require("cors");

const { User, Event } = require("./schemas");
const { stripUser, stripEvent, escapeRegex, emailRegex, idRegex } = require("./util");
const { hash, genSalt } = require("./crypt");

const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const checkPeriod = 1000 * 60 * parseInt(process.env.CHECK_PERIOD_MIN);
const sessionLifetime = 1000 * 60 * parseInt(process.env.SESSION_LIFETIME_MIN);

//==============================================================================
// Express app settings
// These define custom behaviors such as how Express expects to parse input.

// Allow CORS
// TODO: Currently allows requests from any origin - change before production!
const corsOptions = { credentials: true };
if (process.env.ENV === "dev") {
    corsOptions.origin = "http://localhost:3000";
} else if (process.env.ENV === "production") {
    corsOptions.origin = process.env.FRONTEND_IP;
}
app.use(cors(corsOptions));

// Parse request bodies as JSON
app.use(express.json());

// Use session manager
// TODO: Install a session store like connect-mongodb-session before production!

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    rolling: true,
    cookie: { maxAge: sessionLifetime },
    store: new MemoryStore({ checkPeriod: checkPeriod })
};

if (process.env.ENV === "production") {
    sessionOptions.proxy = true;
    sessionOptions.cookie.sameSite = "none";
    sessionOptions.cookie.secure = true;
}

app.use(session(sessionOptions));

//==============================================================================
// API routes

app.get("/", (req, res) => res.sendFile("test-frontend.html", { root: "." }));

app.get("/check-session", (req, res) => res.json(Boolean(req.session.userId)));

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

app.post("/login", async (req, res) => {
    // get the username and password of the user trying to login
    const username = req.body.username;
    const password = req.body.password;
    // retrieve that user from database
    const user = await User.findOne({ username: username });
    if (user && user.passwordHash == hash(password, user.salt)) {
        req.session.userId = user._id; // then create a new session ID and return that user
        res.send(stripUser(user.toObject()));
    } else { // otherwise, return an error status
        res.sendStatus(403);
    }
});

app.post("/logout", async (req, res) => {
    const id = req.session.userId;
    const user = await User.findById(id).lean();
    if (user) {
        req.session.destroy();
        res.send();
    } else {
        res.sendStatus(409); // 409 Conflict
    }
});

app.get("/user", async (req, res) => {
    let users = User.find();

    const ids = req.query.ids;
    if (ids) {
        const idArray = ids.split(",");

        // Validate ids
        for (const id of idArray) {
            if (!idRegex.test(id)) {
                res.status(400); // 400 Bad Request
                res.send({ error: "ids are not all 24-digit hexadecimal strings" });
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
    users.map(user => stripUser(user));
    res.send(users);
});

app.get("/user/:id([0-9a-f]{24})", async (req, res) => {
    const id = req.params.id;

    // .lean() makes the query return a JS object instead of a document
    const user = await User.findById(id).lean();
    if (user) {
        res.send(stripUser(user));
    } else {
        res.sendStatus(404); // 404 Not Found
    }
});

app.get("/user/me", checkAuth, async (req, res) => {
    const user = await User.findById(req.session.userId).lean();
    if (user) {
        res.send(stripUser(user));
    } else {
        res.sendStatus(404); // 404 Not Found
    }
});

// Doesn't allow users to change their username or password
app.put("/user/me", checkAuth, async (req, res) => {
    // Find the user indicated by the session's userId, i.e. the logged in user
    const user = await User.findById(req.session.userId);
    const update = req.body;

    async function updateOnlyIfChanged(propName, errorMessage, validate,
        hasChanged = (x, y) => x !== y) {
        const updatedProp = update[propName];
        if (propName in update && hasChanged(user[propName], updatedProp)) {
            if (!validate || await validate(updatedProp))
                user[propName] = updatedProp;
            else
                throw errorMessage;
        }
    }

    const updateEmail = updateOnlyIfChanged("email", "Invalid email", email => emailRegex.test(email));

    const updateFriends = updateOnlyIfChanged("friends", "Invalid or duplicate ids in friends list",
        async (friends) => {
            if (!friends.every(id => idRegex.test(id)))
                return false;
            const numFriends = await User.find().where("_id").in(friends).countDocuments();
            return numFriends === friends.length;
        },
        (x, y) => x.length !== y.length || x.some((n, i) => n !== y[i]));

    const updateFirstName = updateOnlyIfChanged("firstName");
    const updateLastName = updateOnlyIfChanged("lastName");

    try {
        await Promise.all([updateFirstName, updateLastName, updateEmail, updateFriends]);
        await user.save();
        res.send();
    } catch (errorMessage) {
        res.status(400);
        res.json({ error: errorMessage });
    }
});

app.delete("/user/me", checkAuth, async (req, res) => {
    await User.findByIdAndDelete(req.session.userId);
    req.session.destroy();
    res.send();
});

app.post("/event/new", checkAuth, async (req, res) => {
    //need to make sure the changes are valid (i.e. the date is valid, etc.)
    const body = req.body;
    const id = req.session.userId;
    for (const [key, value] of Object.entries(req.body)) {
        if (!value) {
            res.sendStatus(400);
            return;
        }
        if (key == "date" && isNaN(value)) {
            res.sendStatus(400);
            return;
        }
    }
    const newEvent = new Event(req.body);
    newEvent.host = id;
    try {
        await newEvent.save();
        await User.findOneAndUpdate(
            { _id: id },
            { $push: { hostedEvents: newEvent._id } }
        );
        res.send();
    } catch (err) {
        res.status(403);
        res.send();
    }
});

app.get("/event/:id([0-9a-f]{24})", async (req, res) => {
    const eventID = req.params.id;
    const event = await Event.findById(eventID).lean();
    if (event) { //make sure the event is valid, and if it is, send it
        res.send(stripEvent(event));
    } else { //otherwise, send a 404 error
        res.sendStatus(404);
    }
});

app.delete("/event/:id([0-9a-f]{24})", checkAuth, async (req, res) => {
    const eventID = req.params.id;
    const userId = req.session.userId;
    const event = await Event.findById(eventID).lean();
    if (!event) {
        res.sendStatus(404); // 404 Not Found
        return;
    }
    if (!event.host.equals(userId)) {
        res.sendStatus(403);
        return;
    }
    Event.findByIdAndDelete(eventID, function (err) { //if there is some error in deleting it, then send a 403 error status
        if (err) {
            res.sendStatus(403);
        } else {
            res.sendStatus(200);
        }
    });
    await User.findOneAndUpdate({ _id: userId }, {
        $pullAll: {
            hostedEvents: [{ _id: eventID }]
        }
    });
    await User.updateMany({subscriptions: eventID}, {
        $pullAll: {
            subscriptions: [{_id: eventID}]
        }
    });
});

app.put("/event/:id([0-9a-f]{24})", checkAuth, async (req, res) => {
    const eventID = req.params.id;
    const updates = {};
    for (const [key, value] of Object.entries(req.body)) {
        if (value) {
            if (key == "date" && isNaN(value)) {
                res.sendStatus(400);
                return;
            }
            updates[key] = value;
        }
    }
    const event = await Event.findById(eventID).lean()
    if (req.session.userId != event.host) {
        res.sendStatus(403);
        return;
    }
    if (!event) {
        res.sendStatus(404);
        return;
    }
    await Event.findOneAndUpdate(
        {_id: eventID},
        updates,
    );
    res.sendStatus(200);
});
app.post("/event/:id([0-9a-f]{24})/subscribe", checkAuth, async (req, res) => {
    const userId = req.session.userId;
    const event = await Event.findById(req.params.id);
    if (!event) {
        res.sendStatus(404); // 404 Not Found
        return;
    }
    if (event.members.some(id => id.equals(userId))) {
        res.sendStatus(409); // 409 Conflict - user is already subscribed to event
        return;
    }
    const updateEvent = (async () => {
        event.members.push(userId);
        await event.save();
    })();
    const updateUser = (async () => {
        const user = await User.findById(userId);
        user.subscriptions.push(event._id);
        await user.save();
    })();
    await Promise.all([updateEvent, updateUser]);
    res.send();
});

app.post("/event/:id([0-9a-f]{24})/unsubscribe", checkAuth, async (req, res) => {
    const userId = req.session.userId;
    const event = await Event.findById(req.params.id);
    if (!event) {
        res.sendStatus(404); // 404 Not Found
        return;
    }
    if (!event.members.some(id => id.equals(userId))) {
        res.sendStatus(409); // 409 Conflict - user isn't subscribed to event
        return;
    }
    const updateEvent = (async () => {
        event.members = event.members.filter(id => !id.equals(userId));
        await event.save();
    })();
    const updateUser = (async () => {
        const user = await User.findById(userId);
        user.subscriptions = user.subscriptions.filter(id => !id.equals(event._id));
        await user.save();
    })();
    await Promise.all([updateEvent, updateUser]);
    res.send();
});

//==============================================================================
// Route handlers

// Automatically sends a 403 if the user isn't logged in, so your route handler
// can be assured that the user is authenticated.
// Add this as an intermediate handler to any endpoint that requires
// authentication.
function checkAuth(req, res, next) {
    if (req.session.userId)
        next();
    else
        res.sendStatus(403); // 403 Forbidden
}

//==============================================================================

async function main() {
    await mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });

}

main();
