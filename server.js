const express = require('express') // importing express library
const app = express() // using app to represent the express library, can call app with express methods

const cors = require('cors');
app.use(cors())

// to enable use of body parser
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
    extended: true
}));

// to deploy to Heroku
// changed because port 5000 might not be avaible, so Heroku can select one from environment
app.listen(process.env.PORT || 5000, function (err) {
    if (err) {
        console.log(err);
    }
})

app.use(express.static("public"))

// Put requests here...

app.post("/findAllUnicorns", function (req, res) {
    console.log("request has been recieved")
    // this is how you get the name, use req.body.(whatever is the name of the key)
    // the key in the ajax POST is called unicornName, so match in the POST request here
    // not it is working, what next?
    // need to get the unicorn that matchs the name
    // have to link a unicorns db in here
    // to access the unicor model
    // then use find, regular mongodb commands to find unicorns with that name
    unicornModel.find({}, {name: 1, _id: 0}, function(err, unicorns){
      if (err){ // if there is an error, console it
        console.log("Error " + err);
      }else{
        console.log("Data "+ unicorns); // else console the unicorn
      }
      // now check the network
      // click on the request
      // go to response, now there is a JSON of the requested unicorn here
      res.send(unicorns);
      // now we have to display the unicorn on the page, do this in code.js
  });

})

app.post("/displayThisUnicorn", function (req, res) {
    console.log("request has been recieved")
    // this is how you get the name, use req.body.(whatever is the name of the key)
    // the key in the ajax POST is called unicornName, so match in the POST request here
    // not it is working, what next?
    // need to get the unicorn that matchs the name
    // have to link a unicorns db in here
    // to access the unicor model
    // then use find, regular mongodb commands to find unicorns with that name
    unicornModel.find({name: req.body.name}, function(err, unicorns){
      if (err){ // if there is an error, console it
        console.log("Error " + err);
      }else{
        console.log("Data "+ unicorns); // else console the unicorn
      }
      // now check the network
      // click on the request
      // go to response, now there is a JSON of the requested unicorn here
      res.send(unicorns);
      // now we have to display the unicorn on the page, do this in code.js
  });

})

// to link our server to the unicorns db, this way we can send the info of requested unicorn
const mongoose = require('mongoose'); // import mongoose library
// connecting to our server on db

mongoose.connect("mongodb+srv://A1exander-liU:assignment3@cluster0.xi03q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
// mongoose.connect("mongodb://localhost:27017/test", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
// defining a model to mock the unicorns db
const unicornSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    loves: [String] // means it is an array of strings
});
const unicornModel = mongoose.model("unicorns", unicornSchema);