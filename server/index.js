const express = require("express");
const app = express();
const querystring = require("querystring");
const request = require("request");
const bodyParser = require("body-parser");

//copied from "Connected to nasa-db" -- EDIT?
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user-1:<SlALzKJlkc6R5c0K>@nasa-db-rsces.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  
  client.close();
});

app.use(express.json());

app.post("/handleForm", (req, res) => {
  var obj = req.body;
  obj["media_type"] = "image";
  var url = "https://images-api.nasa.gov/search?" + querystring.stringify(obj);
  request(url, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      res.send(JSON.stringify(body));
    }
    else res.send({});
  });
});

app.post("/getImg", (req, res) => {
  var obj = req.body;
  var url = obj.url;
  request(url, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      res.send(JSON.stringify(body));
    }
    else res.send({});
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
