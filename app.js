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

// Middleware setup
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes setup
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/log-in");
const signupRouter = require("./routes/sign-up");
const addMessageRouter = require("./routes/add-message");
app.use("/", indexRouter);
app.use("/log-in", loginRouter);
app.use("/sign-up", signupRouter);
app.use("/add-message", addMessageRouter);


// Session and passport setup
app.use(session({ secret: "arepo", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Server start
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
