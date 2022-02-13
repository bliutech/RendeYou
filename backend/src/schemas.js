/*
Database schemas and Mongoose models

Schemas are largely based on the project proposal doc.

More on schemas: https://mongoosejs.com/docs/guide.html

Models are created with a schema which dictates the shape of the data. They
correspond to collections in the MongoDB database.

More on models: https://mongoosejs.com/docs/models.html
*/

const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    hostedEvents: [ObjectId],
    friends: [ObjectId],
    passwordHash: String,
    salt: String
});

const User = mongoose.model("User", userSchema);

// Converts a User document to a plain JS object and strips sensitive fields
function stripUser(user) {
    user = user.lean();
    delete user.__v;
    delete user.passwordHash;
    delete user.salt;
    user.id = user._id;
    delete user._id;
    return user;
}

exports.User = User;
exports.stripUser = stripUser;
