const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const pool = require("../db");
const bcrypt = require("bcrypt");

// Sign up GET
router.get("/sign-up", (req, res) => {
  res.render("sign-up", {
    title: "Sign Up",
    error: "",
  });
});
// Sign up POST
router.post(
  "/sign-up",
  asyncHandler(async (req, res) => {
    console.log(req.body);

    if (
      req.body.name === "" ||
      req.body.surname === "" ||
      req.body.password === ""
    ) {
      res.render("sign-up", {
        title: "Sign Up",
        error: "Please fill in all the fields",
      });
    }

    const user = await pool.query("SELECT * FROM users WHERE name = $1", [
      req.body.nickname,
    ]);

    if (user.rows.length > 0) {
      console.log("User already exists");
      res.render("sign-up", {
        title: "Sign Up",
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query(
      "INSERT INTO users (name, surname, nickname, status, password) VALUES ($1, $2, $3, $4, $5)",
      [
        req.body.name,
        req.body.surname,
        req.body.nickname,
        req.body.status,
        hashedPassword,
      ]
    );

    // if (req.body.name === user.name && req.body.password === user.password) {
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

    res.redirect("/");
  })
);

module.exports = router;
