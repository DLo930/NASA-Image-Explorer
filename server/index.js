const express = require("express");
const querystring = require("querystring");
const request = require("request");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var User = require("./user-model");
const app = express();

app.use(express.json());

// Connect to MongoDB
const uri = 'mongodb+srv://user-1:9KZSZ3zwmDEYPhxj@nasa-db-rsces.mongodb.net/NASA-Image-Explorer?retryWrites=true';
mongoose.connect(uri, { useNewUrlParser: true });
var db = mongoose.connection;

// DB connection feedback
db.once("open", () => console.log("Connected to DB."));
db.on("error", console.error.bind(console, "Connection error:"));

app.post("/handleLogin", (req, res) => {
  const query = User.where({
    email: req.body.email
  });
  query.findOne((err, obj) => {
    if(err) {
      console.log("Finding error");
      res.send({});
      return;
    }
    if(obj) {
      res.send(obj.comparePassword(req.body.password, this.password) ? obj : {});
      return;
    } else {
      var newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
      newUser.save(err => {
        if(err) {
          console.log("Saving error");
          res.send({});
        }
        else res.send(JSON.stringify(newUser));
      });
    }
  });
});

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

const port = process.env.PORT || 3001;
app.listen(port);
