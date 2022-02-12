const crypto = require("crypto");

exports.hash = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha256");
}

exports.genSalt = () => {
    return crypto.randomBytes(16).toString("hex");
}
