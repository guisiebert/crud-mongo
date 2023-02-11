// Mongo
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const database = client.db("eureca");
const eurecas = database.collection("eureca");


const seed = async (request, response) => {
    await eurecas.insertOne({ userName: "Suede", age: 30, children: ["Tobias"] });
    await eurecas.insertOne({
      userName: "Helder",
      age: 33,
      children: ["Ramiro", "Patrick"],
    });
    await eurecas.insertOne({
      userName: "Wilson",
      age: 25,
      children: ["Toby", "Gustaf"],
    });
    await eurecas.insertOne({ userName: "Cris", age: 3, children: [] });
    await eurecas.insertOne({
      userName: "Stocker",
      age: 15,
      children: ["Muitos", "filhos", "ele", "tem"],
    });
    console.log("Deu boa. Banco de dados cheio de novos rapazes");
  
    response.redirect("/");
    // response.send("Ok, deu boa. Banco de dados cheio de novos rapazes");
  }
  


 const panic = async (req, res) => {
    await eurecas.deleteMany({});

    res.redirect('/')
  }

module.exports =  {panic, seed}