// const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;
const express = require("express");
const app = express();
//Config
// const pug = require("pug");
app.set("views", "./views"); // Thư mục views nằm cùng cấp với file app.js
app.set("view engine", "pug"); // Sử dụng pug làm view engine
// const compiledFunction = pug.compileFile("template.pug");
// console.log(
//   compiledFunction({
//     name: "Timothy",
//   })
// );

app.get("/hello-world", function (req, res) {
  res.send("Hello World");
});

app.get("/users", function (req, res) {
  var users = [
    { name: "User1", email: "user1@gmail.com" },
    { name: "User2", email: "user2@gmail.com" },
  ];
  res.render("users/index", { users: users });
});

app.get("/new-user", (req, res) => {
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
