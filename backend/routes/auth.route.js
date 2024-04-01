const express = require("express");
const router = express.Router();
const register = require("../controlers/auth.controler.js");
const ExpressError = require("../expressError");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

router.get("/", (req, res, next) => {
  res.send("APP IS WORKING!");
});
router.post("/register", register);

module.exports = router;
