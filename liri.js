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

const switchCases = (choice) => {
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

    case "concert-this":
      inquirer.prompt([
        {
          type: "answer",
          name: "name",
        }
      ]).then(answer => {
        if (answer.name) {
          concertSearch(answer.name, fs);
        }
      });

    case "do-what-it-says":
      doWhat();
      break;

    // default: console.log("default" + choice)

  };
};


var askQuestion = () => {
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
function spotifySearch(answer, fs) {
  if (answer === "") {
    answer = "I Want it That Way";
  }
  spotify.search({ type: "track", query: answer }, function (err, data) {
    if (err) {
      return console.log("error occured: " + err);
    }
    console.log(
      `\n ---------------------------------------
  Song: ${data.tracks.items[0].name}, 
  Artist: ${data.tracks.items[0].artists[0].name},
  Album name: ${data.tracks.items[0].album.name}, 
  Preview: ${data.tracks.items[0].external_urls.spotify}
  \n---------------------------------------`);
  })
  // console.log()
};

//movie
const movie = (answer) => {
  if (answer === "") {
    answer = `Mr. Nobody! If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tto485947. It's on Netflix!`
  } else {
    axios.get("http://www.omdbapi.com/?t=" + answer + "&y=&plot=short&apikey=trilogy")
      .then(function (response) {
        console.log(
          `\n------------------------------------------------------------------------------
        Movie title: ${response.data.Title}
        Movie Year: ${response.data.Year}
        IMDB rating: ${response.data.imdbRating}
        Rotten Tomato rating: ${response.data.Ratings[1]}
        Country: ${response.data.Country}
        Language: ${response.data.Language}
        Plot: ${response.data.Plot}
        Actors ${response.data.Actors}
        \n------------------------------------------------------------------------------`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const doWhat = (fs) => {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      console.log("Ooop, can't do what it says!");
    } else {
      spotifySearch(data[1]);
    }
  });
};

const concertSearch = (answer, fs) => {
  if (answer === "") {
    console.log("Please, enter a name to search a band or artist")
  } else {

  }
}

askQuestion();
switchCases();