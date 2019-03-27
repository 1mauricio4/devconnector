const express = require("express");
const path = require("path");
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

// Connect to DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log("error", err));

// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Server Static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const server = app.listen(process.env.PORT || 5000, "0.0.0.0", () =>
  console.log(`server listening on 5000...`)
);
