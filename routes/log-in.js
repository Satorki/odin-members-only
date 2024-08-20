const express = require("express");
const router = express.Router();
const passport = require("passport");
const localStrategy = require("../localStrategy");
const pool = require("../db");
const {
  validateLoginMiddleware,
  validateLogin,
} = require("../validations/log-in-validation");

passport.use(localStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    const userWithSessionData = {
      id: user.id,
      name: user.name,
      status: user.status,
      isLoggedIn: true,
    };

    done(null, userWithSessionData);
  } catch (err) {
    done(err);
  }
});

router.post(
  "/log-in",
  validateLogin(),
  validateLoginMiddleware,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

router.get("/log-in", (req, res) => {
  res.render("log-in", {
    title: "Log In",
    errors: "",
  });
});

module.exports = router;
