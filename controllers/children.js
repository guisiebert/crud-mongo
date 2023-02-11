// Mongo
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const database = client.db("eureca");
const eurecas = database.collection("eureca");

const redirectToList = (response) => response.redirect("/");

// Model
const { readChildren } = require("../models/users");

const newChild = (req, res) => {
  res.render('new-children', {
    parent : req.params.parent,
    parentID : req.params.parentID
  })
}

const newChildHandler = async (req, res) => {
  const newChild = req.body
  const parent = await eurecas.findOne({_id : ObjectId(newChild.ParentID)})
  const newChildren = parent.children
  newChildren.push(newChild.childName)
  await eurecas.updateOne(
    {_id : ObjectId(newChild.ParentID)},
    { $set : {children : newChildren }}
  )
  
  redirectToList(res)
}

const deleteChild = async (req, res) => {
  const children = await readChildren(req.body.parentID)
  children.splice(req.body.childIndex, 1) 
  await eurecas.updateOne(
    { _id : ObjectId(req.body.parentID)},
    { $set: {children : children}}
  )
  res.redirect("/");
  };
  
const updateChild = async (req, res) => {
  res.render('edit-child', {
    parent : req.body.parent,
    parentID : req.body.parentID,
    childName : req.body.childName,
    childIndex : req.body.childIndex
  })
}

const updateChildHandler = async (req, res) => {
  const childrenList = await readChildren(req.body.parentID)
  console.log(childrenList)
  childrenList[req.body.childIndex] = req.body.childName
  console.log(childrenList)
  
  await eurecas.updateOne(
    {_id : ObjectId(req.body.parentID)},
    { $set : {children : childrenList }}
  )
  
  redirectToList(res)
}


module.exports = { newChild, deleteChild, updateChild, newChildHandler, updateChildHandler };