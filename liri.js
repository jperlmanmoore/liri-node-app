//.env file
require("dotenv").config();

//axios
const axios = require("axios");

//file system
const fs = require("fs");

//keys.js -- 
const keys = require("./keys.js");

// inquirer
const inquirer = require("inquirer");

// spotify
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);

//moment
const moment = require('moment');

//bands
// var bandsintown = require('bandsintown')(APP_ID);

function switchCases(choice) {
  switch (choice) {

    case "movie-this":
      inquirer.prompt([
        {
          type: "answer",
          name: "name",
        }
      ]).then(answer => {
        if (answer.name) {
          movie(answer.name);
        }
      });

      break;

    case "spotify-this-song":
      inquirer.prompt([
        {
          type: "answer",
          name: "name",
        }
      ]).then(answer => {
        if (answer.name) {
          spotifySearch(answer.name, fs);
        }
      });

      break;

    default: console.log("default" + choice)
  };
};


var askQuestion = function () {
  inquirer.prompt([
    {
      type: "list",
      name: "choices",
      message: "What do you want to do?",
      choices: ["movie-this", "spotify-this-song", "concert-this", "do-what-it-says"],
    }
  ]).then(answer => {
    // console.log(answer.choices);
    switchCases(answer.choices);
  });

};

//spotify
function spotifySearch(answer) {
  if (answer === "") {
    answer = "I Want it That Way";
  }
  spotify.search({ type: "track", query: answer }, function (err, data) {
    if (err) {
      return console.log("error occured: " + err);
    }
    console.log(
      `\n
  Song: ${data.tracks.items[0].name}, 
  Artist: ${data.tracks.items[0].artists[0].name},
  Album name: ${data.tracks.items[0].album.name}, 
  Preview: ${data.tracks.items[0].external_urls.spotify}
  \n`);
  })
  // console.log()
};

//movie
var movie = (answer) => {
  if (answer === "") {
    answer = `Mr. Nobody! If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tto485947. It's on Netflix!`
  }
  // var queryURL = "http://www.omdbapi.com/?t=" + answer + "&y=&plot=short&apikey=trilogy";
  // console.log(queryURL);
  axios.get("http://www.omdbapi.com/?t=" + answer + "&y=&plot=short&apikey=trilogy")
    .then( function(response) {
      console.log(
        `\n
        Movie title: ${response.data.Title}
        Movie Year: ${response.data.Year}
        IMDB rating: ${response.data.imdbRating}
        Rotten Tomato rating: ${response.data.Ratings[1]}
        Country: ${response.data.Country}
        Language: ${response.data.Language}
        Plot: ${response.data.Plot}
        Actors ${response.data.Actors}
        \n`)
    })
      
      // response => {
      // console.log();
      // console.log(response);
    // })
    .catch(function(error) {
      console.log(error);
    
  // fs.appendFile("log.txt", console.log(`Movie title: ${response.title}, Movie Year: ${response.year}, IMDB rating: ${response.imdbRating}, Rotten Tomato rating: ${response.ratings.source[1]}, Country: ${response.country}, Language: ${response.language}, Plot: ${response.plot}, Actors ${response.actors}`))
});
};

askQuestion();
switchCases();