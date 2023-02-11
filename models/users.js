const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const database = client.db("eureca");
const eurecas = database.collection("eureca");

// READ USERS
const readUsers = async () => {
  return await eurecas.find({}).toArray();
};

// READ CHILDREN
const readChildren = async (parentID) => {
  const user = await eurecas.findOne({ _id : ObjectId(parentID)})
  // const children = user.children
  return user.children
};

// CREATE
const createUsers = async (body) => {
  return await eurecas.insertOne({
    userName: body.userName,
    age: body.age,
    children: [],
  });
};


// DELETE
const deleteUser = async (user_id) => {
  return await eurecas.deleteOne({ _id: ObjectId(user_id) });
};


module.exports = { readUsers, createUsers, deleteUser, readChildren };
