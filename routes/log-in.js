const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const pool = require("../db");
const bcrypt = require("bcrypt");

// Log in GET
router.get("/log-in", (req, res) => {
  res.render("log-in", {
    title: "Log In",
    error: "",
  });
});

// Log in POST
router.post(
  "/log-in",
  asyncHandler(async (req, res) => {
    const user = await pool.query("SELECT * FROM users WHERE nickname = $1", [
      req.body.username,
    ]);

    if (user.rows.length === 0) {
      res.render("log-in", {
        title: "Log In",
        error: "User does not exist",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.rows[0].password
    );

    if (!validPassword) {
      res.render("log-in", {
        title: "Log In",
        error: "Wrong password",
      });
    }

    req.session.user = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      status: user.rows[0].status,
      isLoggedIn: true,
    };

    res.redirect("/");
  })
);

module.exports = router;
