const express = require("express");
const router = express.Router();
const test = require("../controlers/user.controler.js");

router.get("/test", test);

module.exports = router;
