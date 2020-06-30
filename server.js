//Required dependencies
//General
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// //require all models 
// var db = require("./models");

var PORT = process.env.PORT || 3000;

//intialize express
var app = express();

// Middleware
    // Use morgan logger for logging requests
    app.use(logger("dev"));
    // Parse request body as JSON
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // Make public a static folder
    app.use(express.static("public"));

    // Using Handlebars
    var exphbs = require("express-handlebars");
    app.engine("handlebars", exphbs({
        defaultLayout: "main",
        partialsDir: path.join(__dirname, "/views/layouts/partials")
    }));
    app.set("view engine", "handlebars");

  // Connecting to the Mongo DB
  // mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });
  var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoartnews";

mongoose.connect(MONGODB_URI);

//______________________________
//**************************** */
    //ROUTES
//______________________________
//**************************** */

//Shows all articles on the Home page 
app.get("/", function(req, res){

})


//Scrape articles from the New York Times
app.get("/scraped", function(req, res){

})

//Display the saved articles
app.get("/saved", function(req, res){

})

//"post" the saved articles
app.post("/saved/:id", function(req, res){

})

// add update function here??


// delete note here??







// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });