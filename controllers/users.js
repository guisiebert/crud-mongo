// // Mongo
// const { MongoClient } = require("mongodb");
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri);
// const database = client.db("eureca");
// const eurecas = database.collection("eureca");

// Mongoose
const mongoose = require("mongoose");
const User = require("../models/schemas/User");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const { readUsers, createUsers, deleteUser } = require("../models/users");
const redirectToList = (response) => response.redirect("/");
// const writeUsers = require("../models/users").writeUsers;

// VERSÃO SEM CLASSES << Muito melhor!
const usersForm = (request, response) => {
  response.render("form");
};

const usersList = async (request, response) => {
  const users = await readUsers();

  await response.render("list", {
    users,
  });
};

const usersSubmit = (request, response) => {
  const newUser = request.body;
  createUsers(newUser);
  redirectToList(response);
};

const usersDelete = (request, response) => {
  const userToDelete = request.params.index;
  deleteUser(userToDelete);

  redirectToList(response);
};

const userEditRender = (request, response) => {
  const user = request.params;
  response.render("edit", { user });
};

const userEdit = async (req, res) => {
  await User.updateOne(
    { _id: req.body._id },
    {
      userName: req.body.userName,
      age: req.body.age,
    }
  );

  redirectToList(res);
};

module.exports = {
  usersForm,
  usersList,
  usersSubmit,
  usersDelete,
  userEditRender,
  userEdit,
};
