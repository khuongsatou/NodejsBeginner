// const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;
const express = require("express");
const app = express();

app.get("/", function (req, res) {
  // res.send("Hello World 2");
  res.send("<h2>This is my first app</h2>");
});

app.get("/newUser", (req, res) => {
  let username = req.query.username || "";
  const password = req.query.password || "";

  username = username.replace(/[!@#$%^&*]/g, "");
  let users = {};

  if (!username || !password || users[username]) {
    return res.sendStatus(400);
  }

  // const salt = crypto.randomBytes(128).toString("base64");
  // const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");

  // users[username] = { salt, hash };
  res.send("username" + username + "- password" + password);

  res.sendStatus(200);
});

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World");
// });

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
