// Server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Configs do App e Midware
app.set("views", "./views");
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));

// Mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Evita o log chato do mongoose
mongoose
  .connect("mongodb://localhost:27017/pais")
  .then(() => console.log("Database connected"));

// // Model Imports
// const { readUsers, createUsers, deleteUser, readChildren } = require("./models/users");

// Controller Imports
const UsersController = require("./controllers/users");
const {
  newChild,
  deleteChild,
  updateChild,
  newChildHandler,
  updateChildHandler,
} = require("./controllers/children");
const { panic, seed } = require("./controllers/crazyButtons");

// Rotas Parents
app.get("/", UsersController.usersList);
app.get("/users-form", UsersController.usersForm);
app.post("/submit", UsersController.usersSubmit);
app.get("/delete/:index", UsersController.usersDelete);
app.get("/user-edit/:_id/:name/:age", UsersController.userEditRender);
app.post("/edit/", UsersController.userEdit);

// Rotas Children
app.get("/new-child/:parent/:parentID", newChild);
app.post("/new-child-handler", newChildHandler);
app.post("/delete-child", deleteChild);
app.post("/update-child", updateChild);
app.post("/update-child-handler", updateChildHandler);

// Rotas Loucas
app.get("/seed", seed);
app.get("/panic", panic);

app.listen(port, () => {
  console.log("server running on http://localhost:3000");
});

// TESTING
const User = require("./models/schemas/User");
const { ObjectId } = require("mongodb");

// Achando child
app.get("/oi", async (req, res) => {
  const user = await User.findOne({ childName: "Bafito" });

  console.log(user);

  res.send("oi");
});
