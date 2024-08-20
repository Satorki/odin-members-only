const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const pool = require("../db");

// Home
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const messages = await pool.query(
      "SELECT * FROM messages JOIN users ON messages.name_id = users.id;"
    );

    if (!req.user) {
      messages.rows.forEach((message) => {
        message.name = "Anonymous";
      });
    }

    if (req.user) {
      if (req.user.status !== "High") {
        messages.rows.forEach((message) => {
          message.name = "Anonymous";
        });
      }
    }

    res.render("index", {
      title: "Home Page",
      isLoggedIn: req.isAuthenticated() ? "Logged in" : "Not logged in",
      messages: messages.rows,
      name: req.user ? req.user.name : "",
      status: req.user ? req.user.status : "",
    });
  })
);

module.exports = router;
