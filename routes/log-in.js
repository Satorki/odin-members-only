const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const pool = require("../db");

// Log in GET
router.get("/log-in", (req, res) => {
    res.render("log-in", {
      title: "Log In",
    });
  });
  
  // Log in POST
  // router.post("/log-in", (req, res) => {
  //   if (req.body.name === user.name && req.body.password === user.password) {
  //     res.render("index", {
  //       title: "Home Page",
  //       isLoggedIn: "Logged in",
  //       messages: messages,
  //       name: user.name,
  //       status: "Logged in",
  //     });
  //   } else {
  //     res.render("index", {
  //       title: "Home Page",
  //       isLoggedIn: "Not logged in",
  //       messages: messages,
  //       name: user.name,
  //       status: "Not logged in",
  //     });
  //   }
  // });

  module.exports = router;