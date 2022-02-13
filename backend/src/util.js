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

exports.stripUser = stripUser;
