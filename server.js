const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("Hello"));

const server = app.listen(process.env.PORT || 5000, () =>
  console.log("server listening on 5000...")
);
