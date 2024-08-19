const pool = require("./db");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");

const localStrategy = new LocalStrategy(
  {
    usernameField: "nickname",
    passwordField: "password",
  },
  async (nickname, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE nickname = $1",
        [nickname]
      );

      const user = rows[0];
      if (!user) {
        console.log("User not found");

        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("Passwords do not match");

        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

module.exports = localStrategy;
