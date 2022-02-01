/*
Database utility functions

Reference these docs:
https://mongodb.github.io/node-mongodb-native/4.3/classes/MongoClient.html
https://mongodb.github.io/node-mongodb-native/4.3/classes/Db.html
https://mongodb.github.io/node-mongodb-native/4.3/classes/Collection.html
*/

const readenv = require("dotenv").config();

if (readenv.error)
    throw "You need a .env file!";

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_URL);

// Database - a set of collections
let db = null;

// Collections - like tables in SQL
let users = null;
let events = null;

module.exports = {
    connect: async () => {
        await client.connect();
        console.log("Successfully connected to MongoDB server.");
        db = client.db(process.env.DB_NAME);
        users = db.collection("users");
        events = db.collection("events");
    },
    get users() {
        if (users === null)
            throw "Error: Trying to access collection \"users\" before connecting to MongoDB server.";
        return users;
    },
    get events() {
        if (events === null)
            throw "Error: Trying to access collection \"events\" before connecting to MongoDB server.";
        return users;
    }
}
