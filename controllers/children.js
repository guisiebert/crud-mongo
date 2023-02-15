// Mongo
const { MongoClient, ObjectId } = require("mongodb");
const User = require("../models/schemas/User");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const database = client.db("eureca");
const eurecas = database.collection("eureca");

const redirectToList = (response) => response.redirect("/");

// Model
const { readChildren, createChild } = require("../models/users");

// New Child: RENDER
const newChild = (req, res) => {
  res.render("new-child", {
    parent: req.params.parent,
    parentID: req.params.parentID,
  });
};

// New Child: HANDLER
const newChildHandler = async (req, res) => {
  await createChild(req.body, req.body.parentID);
  redirectToList(res);
};

//Delete Child - v2 (via splice)
const deleteChild = async (req, res) => {
  const parent = await User.findById(req.body.parentID);
  parent.children.splice(req.body.childIndex, 1);
  await parent.save();

  res.redirect("/");
};

// Update Child: RENDER
const updateChild = async (req, res) => {
  res.render("edit-child", {
    child: req.body,
  });
};

// Update Child: HANDLER v2 (via troca na array)
const updateChildHandler = async (req, res) => {
  const parent = await User.findById(req.body.parentID);
  parent.children[req.body.childIndex] = req.body;
  await parent.save();

  redirectToList(res);
};

module.exports = {
  newChild,
  deleteChild,
  updateChild,
  newChildHandler,
  updateChildHandler,
};
