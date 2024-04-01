const express = require("express");
const ExpressError = require("../expressError");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new ExpressError("username,email, password are required", 404);
    }
    console.log(username);
    await User.register(username, email, password);
    // User.updateRegisterTimestamp(username);
    // const token = jwt.sign({ username }, SECRET_KEY);
    // return res.json({ message: "You are registered", token });
    return res.json({ message: "You are registered" });
  } catch (e) {
    return next(e);
  }
};
module.exports = register;
