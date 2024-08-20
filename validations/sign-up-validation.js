const { body, validationResult } = require("express-validator");

const validateSignUp = () => {
  return [
    body("name").trim().notEmpty().withMessage("User name is needed"),
    body("surname").trim().notEmpty().withMessage("User surname is needed"),
    body("nickname").trim().notEmpty().withMessage("User name is needed"),
    body("password").trim().notEmpty().withMessage("Password is needed"),
  ];
};

const validateSignUpMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("sign-up", {
      title: "Sign-up",
      errors: errors.array(),
      // name: req.body.name,
      // surname: req.body.surname,
      // nickname: req.body.nickname,
      // password: req.body.password,
    });
  }
  next();
};

module.exports = { validateSignUp, validateSignUpMiddleware };
