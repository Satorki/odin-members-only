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

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    status: "Not logged in",
    messages: messages,
  });
});

module.exports = router;
