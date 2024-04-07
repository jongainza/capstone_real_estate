const express = require("express");
const router = express.Router();
const db = require("../db");
const { ensureLoggedIn } = require("../middleware/auth.middleware");

router.get("/users", ensureLoggedIn, async (req, res) => {
  const results = await db.query(`SELECT * FROM users`);
  return res.json({ results: results.rows, user: `${req.user.username}` });
});

module.exports = router;
