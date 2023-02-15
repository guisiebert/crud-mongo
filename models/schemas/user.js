const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;

const ChildSchema = new mongoose.Schema({
  childName: String,
  childAge: Number,
  childId: ObjectId,
});

const userSchema = new mongoose.Schema({
  userName: String,
  age: Number,
  userPhone: Number,
  bestFriend: mongoose.SchemaTypes.ObjectId,
  children: [ChildSchema],
});

module.exports = mongoose.model("User", userSchema);
