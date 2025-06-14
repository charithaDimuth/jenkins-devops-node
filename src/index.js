const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "Pawan" }]);
});

app.get("/health", (req, res) => {
  res.send("OK");
});

module.exports = app;
