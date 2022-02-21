/*
Database schemas and Mongoose models

Schemas are largely based on the project proposal doc.

More on schemas: https://mongoosejs.com/docs/guide.html

Models are created with a schema which dictates the shape of the data. They
correspond to collections in the MongoDB database.

More on models: https://mongoosejs.com/docs/models.html
*/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    hostedEvents: [mongoose.ObjectId],
    friends: [mongoose.ObjectId],
    passwordHash: String,
    salt: String
});

const User = mongoose.model("User", userSchema);

exports.User = User;
