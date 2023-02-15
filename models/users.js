// // MongoDB (delete it)
// const { MongoClient } = require("mongodb");
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri);
// const database = client.db("eureca");
// const eurecas = database.collection("eureca");

// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = require("./schemas/User");

// READ USERS
const readUsers = async () => {
  return await User.find();
};

// READ CHILDREN
const readChildren = async (parentID) => {
  const user = await User.findById(parentID);
  return user.children;
};

// CREATE
const createUsers = async (data) => {
  return await User.create({
    userName: data.userName,
    age: data.age,
    userPhone: data.userPhone,
    children: [],
  });
};

// EDIT
const editUser = async (user) => {
  return await User;
};

// DELETE
const deleteUser = async (userId) => {
  return await User.deleteOne({ _id: userId });
};

// CREATE CHILD
const createChild = async (childData, parentId) => {
  const parent = await User.findById(parentId);
  parent.children.push(childData);
  parent.save();
};

const newChildHandler = async (req, res) => {
  const parent = await User.findById(req.body.parentID);
  parent.children.push(req.body);
  parent.save();
  console.log(parent);

  redirectToList(res);
};

module.exports = {
  readUsers,
  createUsers,
  deleteUser,
  readChildren,
  createChild,
};
