const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const pool = require("../db");

router.get(
  "/add-message",
  asyncHandler(async (req, res) => {
    res.render("add-message", {
      title: "Add Message",
      isLoggedIn: req.isAuthenticated() ? "Logged in" : "Not logged in",
      name: req.user ? req.user.name : "",
      status: req.user ? req.user.status : "",
      error: "",
    });
  })
);

router.post(
  "/add-message",
  asyncHandler(async (req, res) => {
    if (!req.user) {
      return res.render("add-message", {
        title: "Add Message",
        isLoggedIn: req.user ? "Logged in" : "Not logged in",
        name: req.user ? req.user.name : "",
        status: req.user ? req.user.status : "",
        error: "You need to log in",
      });
    }
    const title = req.body.title;
    const content = req.body.content;
    const name_id = req.user.id;
    const date = new Date().toLocaleString();
    const newMessage = await pool.query(
      "INSERT INTO messages (title, content, name_id, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, name_id, date]
    );

    res.redirect("/");
  })
);

module.exports = router;
