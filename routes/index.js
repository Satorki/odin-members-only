const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const pool = require("../db");

// Home
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // take the messages from database
    const messages = await pool.query("SELECT * FROM messages");

    res.render("index", {
      title: "Home Page",
      isLoggedIn: req.session.user ? "Logged in" : "Not logged in",
      messages: messages.rows,
      name: req.session.user ? req.session.user.name : "",
      status: req.session.user ? req.session.user.status : "",
    });
  })
);

module.exports = router;
