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

//optimally, I would wrap the inquirer.prompt in a function and not type it multiple times
const switchCases = choice => {
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
      break;
    case "do-what-it-says":
      doWhat();
      break;
  };
  // default: console.log("default" + choice)
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
    fs.appendFile("log.txt", answer.choices, function (err) {
      if (err) {
        console.log(err)
      }
    })
  });
};

//spotify
const spotifySearch = answer => {
  if (answer === "") {
    answer = "I Want it That Way";
  }
  spotify.search({ type: "track", query: answer }, function (err, data) {
    if (err) {
      return console.log("error occured: " + err);
    };
    var spotifyResults =
      `\n ------------------------------------------------------------------------------------
  Song: ${data.tracks.items[0].name}, 
  Artist: ${data.tracks.items[0].artists[0].name},
  Album name: ${data.tracks.items[0].album.name}, 
  Preview: ${data.tracks.items[0].external_urls.spotify}
  \n----------------------------------------------------------------------------------------
  \n`;
  fs.appendFile('log.txt', spotifyResults, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(spotifyResults)
    }
  })  
});
  
};


//movie
const movie = answer => {
  if (answer === "") {
    answer = `Mr. Nobody! If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tto485947. It's on Netflix!`
  } else {
    axios.get("http://www.omdbapi.com/?t=" + answer + "&y=&plot=short&apikey=trilogy")
      .then(function (response) {
        var movies =
          `\n------------------------------------------------------------------------------
        Movie title: ${response.data.Title}
        Movie Year: ${response.data.Year}
        IMDB rating: ${response.data.imdbRating}
        Rotten Tomato rating: ${response.data.Ratings[1].Value}
        Country: ${response.data.Country}
        Language: ${response.data.Language}
        Plot: ${response.data.Plot}
        Actors ${response.data.Actors}
        \n------------------------------------------------------------------------------
        \n`;
        fs.appendFile("log.txt", movies, err => {
          if (err) {
            console.log(err);
          } else {
            console.log(movies)
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

const doWhat = text => {
  fs.readFile("random.txt", "utf8", (err, text) => {
    if (err) { console.log("oops") }
    text = text.split(",");
    // console.log(text);
    spotifySearch(text[1]);
    // concertSearch(text[3]); //I could not get this one to work correctly
    movie(text[5]);
  });
  return text;
};

const concertSearch = (answer) => {
  if (answer === "") {
    console.log("Please, enter a name to search a band or artist")
  } else {
    // const queryURL = `https://rest.bandsintown.com/artists/${answer}/events?app_id=codingbootcamp`
    // console.log(queryURL);
    axios.get(`https://rest.bandsintown.com/artists/${answer}/events?app_id=codingbootcamp`)
      .then(response => {
        for (var i = 0; i < 5; i++) {
          var concerts = `

------------------------------------------------------------------------------
Venue name: ${response.data[i].venue.name}
Venue location: ${response.data[i].venue.city}
Event date: ${moment(response.data[i].datetime).format("MM/DD/YYY")}
------------------------------------------------------------------------------
`
        };
        fs.appendFile("log.txt", concerts, err => {
          if (err) {
            console.log(err);
          } else {
            console.log(concerts)
          }
        })
      })
  };
};


askQuestion();
switchCases();