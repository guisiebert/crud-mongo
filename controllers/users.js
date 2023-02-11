// Mongo
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const database = client.db("eureca");
const eurecas = database.collection("eureca");
// const ObjectId = require("mongodb").ObjectId;

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

const usersEditForm = (request, response) => {
  const user = request.params;
  response.render("edit", { user });
};

const usersEditHandler = async (request, response) => {
  const user = request.body;
  await eurecas.updateOne(
    { _id: ObjectId(user._id) },
    { $set: { userName: user.userName, age: user.age } }
  );

  redirectToList(response);
};

module.exports = {
  usersForm,
  usersList,
  usersSubmit,
  usersDelete,
  usersEditForm,
  usersEditHandler,
};
