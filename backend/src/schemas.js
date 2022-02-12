// See project proposal doc for schema explanations

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

exports.User = mongoose.model("User", userSchema);
