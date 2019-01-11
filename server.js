const express = require("express");
const mongoose = require("mongoose");

const app = express();

// DB config
const db = require("./config/keys").mongoURI;

// Connect to DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`server listening on 5000...`)
);
