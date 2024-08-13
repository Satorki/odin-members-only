const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const pool = require("../db");

// Home
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // take the users from database
    const users = await pool.query("SELECT * FROM users");
    // take the messages from database
    const messages = await pool.query("SELECT * FROM messages");

    res.render("index", {
      title: "Home Page",
      isLoggedIn: "Not logged in",
      messages: messages.rows,
      name: "user.name",
      status: "Not logged in",
    });
  })
);

module.exports = router;
