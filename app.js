const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

// App start
const app = express();

// Port and env setup
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Session and passport setup
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware setup
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes setup
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/log-in");
const logoutRouter = require("./routes/log-out");
const signupRouter = require("./routes/sign-up");
const addMessageRouter = require("./routes/add-message");
app.use("/", indexRouter);
app.use("/", loginRouter);
app.use("/", signupRouter);
app.use("/", addMessageRouter);
app.use("/", logoutRouter);

// Server start
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
