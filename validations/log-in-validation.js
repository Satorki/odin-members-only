const { body, validationResult } = require("express-validator");

const validateLogin = () => {
  return [
    body("nickname").trim().notEmpty().withMessage("User name is needed"),
    body("password").trim().notEmpty().withMessage("Password is needed"),
  ];
};

const validateLoginMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("log-in", {
      title: "Log In",
      errors: errors.array(),
      username: req.body.username,
      password: req.body.password,
    });
  }
  next();
};

module.exports = { validateLogin, validateLoginMiddleware };
