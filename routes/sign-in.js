const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const pool = require("../db");

// Sign up GET
router.get("/sign-up", (req, res) => {
  res.render("sign-up", {
    title: "Sign Up",
  });
});
// Sign up POST
router.post(
  "/sign-up",
  asyncHandler(async (req, res) => {
    // take the users name and password from the database
    const users = await pool.query("SELECT * FROM users");

    // check if the user already exists
    for (let i = 0; i < users.rows.length; i++) {
      if (users.rows[i].name === req.body.name) {
        return res.render("sign-up", {
          title: "Sign Up",
          error: "User already exists",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query("INSERT INTO users (name, password) VALUES ($1, $2)", [
      req.body.name,
      hashedPassword,
    ]);

    if (req.body.name === user.name && req.body.password === user.password) {
      res.render("index", {
        title: "Home Page",
        isLoggedIn: "Logged in",
        messages: messages,
        name: user.name,
        status: "Logged in",
      });
    } else {
      res.render("index", {
        title: "Home Page",
        isLoggedIn: "Not logged in",
        messages: messages,
        name: user.name,
        status: "Not logged in",
      });
    }
  })
);

module.exports = router;
