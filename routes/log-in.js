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

    res.render("index", {
      title: "Home Page",
      isLoggedIn: "Logged in",
      messages: [],
      name: user.rows[0].name,
      status: "Logged in",
    });
  })
);

// if (
//   req.body.username === user.rows[0].nickname &&
//   req.body.password === user.rows[0].password
// ) {
//   res.render("index", {
//     title: "Home Page",
//     isLoggedIn: "Logged in",
//     messages: messages,
//     name: user.name,
//     status: "Logged in",
//   });
// } else {
//   res.render("index", {
//     title: "Home Page",
//     isLoggedIn: "Not logged in",
//     messages: messages,
//     name: user.name,
//     status: "Not logged in",
//   });
// }

module.exports = router;
