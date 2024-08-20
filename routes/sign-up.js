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
