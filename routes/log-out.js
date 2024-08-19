const espresse = require("express");
const router = espresse.Router();

router.get("/log-out", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

module.exports = router;
