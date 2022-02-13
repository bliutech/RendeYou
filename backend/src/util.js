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

exports.stripUser = stripUser;
exports.escapeRegex = escapeRegex;
