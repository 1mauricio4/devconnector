const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB config
const db = require("./config/keys").mongoURI;
const key = require("./config/keys").secretOrKey;

// Connect to DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`server listening on 5000...`)
);
