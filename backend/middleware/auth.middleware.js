const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
const ExpressError = require("../expressError");

function authenticateJWT(req, res, next) {
  try {
    const tokenFromBody = req.body._token;
    const payload = jwt.verify(tokenFromBody, SECRET_KEY);
    req.user = payload;
    console.log("YOu have a valid token");
    return next();
  } catch (err) {
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    const err = new ExpressError("unauthorized", 401);
    return next(err);
  } else {
    return next();
  }
}

module.exports = { authenticateJWT, ensureLoggedIn };
