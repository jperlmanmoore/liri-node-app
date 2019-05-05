//.env file
require("dotenv").config();

//axios
const axios = require("axios");

//file system
const fs = requre("fs");

//keys.js -- 
const keys = require("./keys.js");

// inquirer
const inquirer = require("inquirer");

//spotify key
const spotify = new Spotify(keys.spotify);

//omdb key


//bands in town key


//create object
const choice

//command line user input
const liriChoice = process.argv[2]; //case
const input = process.argv.slice(3).join(""); //input
//what if more than one word???



//siwtch case - ES6 needs to be objet literal
switch(liriChoice) {
  case "movie-this":
   //liriChoice. //movie()
  break;
  default;

  case "spotify-this-song":
    if(input) {
    spotify()
    } else {
    // spotify default
    }
  break;

  case "do-what-it-says":
    //if(input) {
      //doWhat()
      // } else {
        //do-what-default
      //}
  break;

  case "concert-this":
    //if (input) {
    //concert() 
    // } else {
      //concert-default
    //}
  break;
}

function spotify() {
  //spotify search check on webpage

  //fs.appendFile
};

function movie() {
  var movieURL = "http:/"

  //fs.appendFile
};

function concert() {

  //fs.appendFile
};


spotify()
concert()
movie()
doWhat()