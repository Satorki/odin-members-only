const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const pool = require("../db");
const bcrypt = require("bcrypt");
const {
  validateSignUp,
  validateSignUpMiddleware,
} = require("../validations/sign-up-validation");

// Sign up GET
router.get("/sign-up", (req, res) => {
  res.render("sign-up", {
    title: "Sign Up",
    errors: "",
  });
});
// Sign up POST
router.post(
  "/sign-up",
  validateSignUp(),
  validateSignUpMiddleware,
  asyncHandler(async (req, res) => {
    // if (
    //   req.body.name === "" ||
    //   req.body.surname === "" ||
    //   req.body.password === ""
    // ) {
    //   res.render("sign-up", {
    //     title: "Sign Up",
    //     error: "Please fill in all the fields",
    //   });
    // }

    // const user = await pool.query("SELECT * FROM users WHERE nickname = $1", [
    //   req.body.nickname,
    // ]);

    // if (user.rows.length > 0) {
    //   console.log("User already exists");
    //   res.render("sign-up", {
    //     title: "Sign Up",
    //     error: "User already exists",
    //   });
    // } else {

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

    res.redirect("/");
  })
);

module.exports = router;
