const crypto = require('crypto');

function hashPassword(password) {
    // Bad: Weak MD5 hashing algorithm without salt
    return crypto.createHash('md5').update(password).digest('hex');
}

function verifyToken(token) {
    // Bad: Hardcoded secret key
    const secret = "mySecretKey123";
    if (token === secret) {
        return true;
    }
    return false;
}

module.exports = { hashPassword, verifyToken };
