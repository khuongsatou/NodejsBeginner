const hostname = "127.0.0.1";
const port = 3000;
const express = require("express");
const app = express();
//Config PUG
app.set("views", "./views"); // Thư mục views nằm cùng cấp với file app.js
app.set("view engine", "pug"); // Sử dụng pug làm view engine

// Config express
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var users = [
  { id: 1, name: "User1", email: "user1@gmail.com", age: 31 },
  { id: 2, name: "User2", email: "user2@gmail.com", age: 20 },
  { id: 3, name: "User1", email: "user1.2@gmail.com", age: 25 },
];

app.get("/", function (req, res) {
  res.send("<h2>This is my first app</h2>");
});

app.get("/hello-world", function (req, res) {
  res.send("Hello World");
});

app.get("/users", function (req, res) {
  res.render("users/index", { users: users });
});

app.get("/users/:id", (req, res) => {
  // do some thing here
  console.log(req.params);
  // Tìm user phù hợp với params id
  var user = users.find((user) => {
    return user.id == parseInt(req.params.id);
  });

  // Render trang show, với một biến user được định nghĩa là user vừa tìm được
  res.render("users/show", {
    user: user,
  });
});

app.get("/users/search", (req, res) => {
  console.log(req.query);
  var name_search = req.query.name;
  var age_search = req.query.age;
  var result = users.filter((user) => {
    return (
      user.name?.toLowerCase().indexOf(name_search?.toLowerCase()) !== -1 &&
      user.age === parseInt(age_search)
    );
  });
  res.render("users/index", {
    users: result,
  });
});

app.get("/users/create", (req, res) => {
  res.render("users/create");
});

app.post("/users/create", (req, res) => {
  // add new user here
  console.log(req.body);
  users.push(req.body);
  res.redirect("/users");
});

app.get("/new-user", (req, res) => {
  let username = req.query.username || "";
  const password = req.query.password || "";

  username = username.replace(/[!@#$%^&*]/g, "");
  let users = {};

  if (!username || !password || users[username]) {
    return res.sendStatus(400);
  }

  res.send("username" + username + "- password" + password);

  res.sendStatus(200);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
