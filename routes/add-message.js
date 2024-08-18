const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const pool = require("../db");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.render("add-message", {
      title: "Add Message",
    });
  })
);

router.post(
  "/add-message",
  asyncHandler(async (req, res) => {
    await pool.query("INSERT INTO messages (title, content) VALUES ($1, $2)", [
      req.body.title,
      req.body.content,
    ]);
    res.redirect("/");
  })
);

module.exports = router;
