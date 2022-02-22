// Utility functions

// Strip extraneous/sensitive fields from user object
// user must be a regular JS object, not a document (i.e. use .lean() when
// querying, or call .toObject() on an existing document).
function stripUser(user) {
    delete user.__v;
    delete user.passwordHash;
    delete user.salt;
    user.id = user._id;
    delete user._id;
    return user;
}

// Escape str so that regex will search for str literally even if it contains
// special characters.
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

exports.emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
exports.idRegex = /[0-9a-f]{24}/;

exports.stripUser = stripUser;
exports.escapeRegex = escapeRegex;
