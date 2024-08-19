const express = require("express");
const router = express.Router();
const passport = require("passport");
const localStrategy = require("../localStrategy");
const pool = require("../db");

passport.use(localStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});

router.get("/log-in", (req, res) => {
  res.render("log-in", {
    title: "Log In",
    error: "",
  });
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

module.exports = router;

// const asyncHandler = require("express-async-handler");
// const pool = require("../db");
// const bcrypt = require("bcrypt");
// Log in POST
// router.post(
//   "/log-in",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/log-in",
//     failureFlash: true,
//   }),
//   asyncHandler(async (req, res) => {
//     const user = await pool.query("SELECT * FROM users WHERE nickname = $1", [
//       req.body.username,
//     ]);

//     if (user.rows.length === 0) {
//       res.render("log-in", {
//         title: "Log In",
//         error: "User does not exist",
//       });
//     }

//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.rows[0].password
//     );

//     if (!validPassword) {
//       res.render("log-in", {
//         title: "Log In",
//         error: "Wrong password",
//       });
//     }

//     req.session.user = {
//       id: user.rows[0].id,
//       name: user.rows[0].name,
//       status: user.rows[0].status,
//       isLoggedIn: true,
//     };

//     res.redirect("/");
//   })
// );
