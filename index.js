// Server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
// const res = require("express/lib/response");

// Configs do App e Midware
app.set("views", "./views");
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false })); 

// // Mongo
// const { MongoClient, ObjectId } = require("mongodb");
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri);
// const database = client.db("eureca");
// const eurecas = database.collection("eureca");

// // Model Imports
// const { readUsers, createUsers, deleteUser, readChildren } = require("./models/users");

// Controller Imports
const UsersController = require("./controllers/users");
const { newChild, deleteChild, updateChild, newChildHandler, updateChildHandler } = require("./controllers/children");
const { panic, seed} = require('./controllers/crazyButtons')

// Rotas Parents
app.get("/", UsersController.usersList);
app.get("/users-form", UsersController.usersForm);
app.post("/submit", UsersController.usersSubmit);
app.get("/delete/:index", UsersController.usersDelete);
app.get("/user-edit/:_id/:name/:age", UsersController.usersEditForm);
app.post("/edit/", UsersController.usersEditHandler);

// Rotas Children
app.get('/new-child/:parent/:parentID', newChild)
app.post('/new-child-handler', newChildHandler);
app.post("/delete-child", deleteChild);
app.post('/update-child', updateChild)
app.post('/update-child-handler', updateChildHandler)

// Rotas Loucas
app.get("/seed", seed);
app.get("/panic", panic);


app.listen(port, () => {
  console.log("server running on port 3000");
})