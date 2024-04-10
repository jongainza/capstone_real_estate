const express = require("express");
const ExpressError = require("../expressError");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, default_photo_url } = require("../config");

const register = async (req, res, next) => {
  try {
    let { username, email, password, photo } = req.body;
    if (!photo) {
      photo = default_photo_url;
    }
    if (!username || !email || !password) {
      throw new ExpressError("username,email, password are required", 404);
    }
    console.log(username);
    const data = await User.register(username, email, password);
    // User.updateRegisterTimestamp(username);
    const token = jwt.sign({ username }, SECRET_KEY);
    return res.status(201).json({
      success: data.success,
      message: data.message,
      username: data.username,
      email: data.email,
      registration_date: data.registration_date,
      token,
    });
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

const firebase = async (req, res, next) => {
  try {
    const userEmail = req.body.email; // Extract the email from the request body
    // console.log(userEmail);
    const user = await User.findUser(userEmail); // Pass the email directly to findUser method
    console.log(user);
    if (user) {
      let _token = jwt.sign(user.username, SECRET_KEY);
      return res.json({
        success: true,
        message: "Welcome back",
        user,
        _token,
      });
    } else {
      // creates a password from numbers 0 to 9 and letters a to z and get the last 9
      const fakePassword = Math.random().toString(36).slice(-9);
      const hashedPassword = await bcrypt.hash(
        fakePassword,
        BCRYPT_WORK_FACTOR
      );

      const username =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-3);
      const email = req.body.email;
      const password = hashedPassword;
      const photo = req.body.photo; // Extract the photo from the request body
      console.log(photo);

      // Check if photo is provided, otherwise provide a default value
      const userPhoto = photo ? photo : default_photo_url;

      // Save new user to the database
      await User.register(username, email, password, userPhoto);

      // Generate token for new user
      let _token = jwt.sign({ username }, SECRET_KEY);

      return res.json({
        success: true,
        message: "Welcome",
        username,
        photo: userPhoto,
        _token,
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { register, signIn, firebase };
