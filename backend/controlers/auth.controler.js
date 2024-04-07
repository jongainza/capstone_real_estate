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
    const token = jwt.sign({ username }, SECRET_KEY);
    return res
      .status(201)
      .json({ success: true, message: "You are registered", token });
    // return res.json({ message: "You are registered" });
  } catch (error) {
    return next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ExpressError("User/Password required", 400);
    }
    if (await User.authenticate(username, password)) {
      let _token = jwt.sign({ username }, SECRET_KEY);
      return res.json({
        success: true,
        message: "You are logged in",
        username,
        _token,
      });
    } else {
      throw new ExpressError("User/Password incorrect", 400);
    }
  } catch (e) {
    return next(e);
  }
};
module.exports = { register, signIn };
