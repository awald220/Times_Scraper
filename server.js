//Required dependencies
//General
var express = require("express");
var mongoose = require("mongoose");

//Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// //require all models 
// var db = require("./models");

var PORT = 3000;

//intialize express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });