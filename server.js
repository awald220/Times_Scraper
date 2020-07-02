//Required dependencies
//General
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

//Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// //require all models 
var db = require("./models");

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
  db.Article.find({"saved": false}).then(function(result){
    var hbsObject = { articles: result};

    res.render("index", hbsObject);
  }).catch(function(err){res.json(err)});
})


//Scrape articles from the New York Times
app.get("/scraped", function(req, res){
  axios.get("https://www.nytimes.com/").then(function(response){
    var $ = cheerio.load(response.data);

    $("article").each(function(i, element){
      var result = {}

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      
      db.Article.create(result)
        .then(function(dbArticle){
          console.log(dbArticle);
        })
        .catch(function(err){
          console.log(err);
        });
    });

    res.send("Scrape Complete");x
  })
})

//Display the saved articles
app.get("/saved", function(req, res){
  db.Article.find({"saved": true})
  .populate("notes")
  .then(function(result){
  var hbsObject = { articles: result };
  res.render("saved",hbsObject);
}).catch(function(err){ res.json(err) });
})

//"post" the saved articles
app.post("/saved/:id", function(req, res){
  db.Article.findOneAndUpdate({"_id": req.params.id}, {"$set": {"saved": true}})
  .then(function(result) {
      res.json(result);
  }).catch(function(err){ res.json(err) });
})

// delete saved article here 
app.post("/delete/:id", function(req, res){
  db.Article.findOneAndUpdate({"_id": req.params.id}, {"$set": {"saved": false}})
  .then(function(result){
      res.json(result);
  }).catch(function(err) { res.json(err) });
});


// Grabs a specific article by id and populates it with it's note(s)
app.get("/articles/:id", function(req, res) {
  db.Article.findOne({"_id": req.params.id })
    .populate("notes")
    .then(function(result) {
      res.json(result);
    }).catch(function(err) { res.json(err); });
});





// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });