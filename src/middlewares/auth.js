const jwt = require('jsonwebtoken');

const { AuthError } = require('../errors');

const { JWT_SECRET = 'dev-secret' } = process.env;

function authUser(req, res, next) {
  try {
    const token = req.cookies.jwt;

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;

    next();
  } catch (err) {
    next(new AuthError());
  }
}

module.exports = { authUser };
