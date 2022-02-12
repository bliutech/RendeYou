/*
Util functions for cryptography

Recommended values per https://en.wikipedia.org/wiki/PBKDF2#Purpose_and_operation
Iterations: at least 1000
Salt length: 8-16 bytes

More on crypto: https://nodejs.org/api/crypto.html
*/

const crypto = require("crypto");


exports.hash = (password, salt) =>
    crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256").toString("hex");

exports.genSalt = () => crypto.randomBytes(16).toString("hex");
