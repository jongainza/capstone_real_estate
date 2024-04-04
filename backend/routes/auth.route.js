const express = require("express");
const router = express.Router();
const { register, signIn } = require("../controlers/auth.controler.js");

router.get("/", (req, res, next) => {
  res.send("APP IS WORKING!");
});
router.post("/register", register);
router.post("/signin", signIn);

module.exports = router;
