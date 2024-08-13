const express = require("express");
const router = express.Router();

const messages = [
  {
    title: "Hello",
    content: "Welcome to my page",
    name: "Amando",
    date: new Date().toLocaleString(),
  },
];

const user = {
  name: "Amando",
  password: "1234",
};

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    isLoggedIn: "Not logged in",
    messages: messages,
    name: user.name,
    status: "Not logged in",
  });
});

router.get("/log-in", (req, res) => {
  res.render("log-in", {
    title: "Log In",
  });
});

router.get("/sign-up", (req, res) => {
  res.render("sign-up", {
    title: "Sign Up",
  });
});

module.exports = router;
