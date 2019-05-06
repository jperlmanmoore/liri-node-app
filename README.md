# liri-node-app

## Summary

This project is a command line app. This app give useful information about songs, concerts, and movies.

## Commands

The app takes in commands from the terminal, including "movie-this", "concert-this", "spotify-this", and "do-what-it-says."

After the commands are taken in the app makes use of a switch, to allow the user to make a choice of what they would like to search for within the chosen category.

The app makes use of node modules including, inquirer, moments, and axios. The inquirer module is used to provide the user prompts for input. The moments module allows the bands in town app to search for concerts based on today. The axios module allows the https request from node.js

## Built With

Javascript
Node.js

## Uses

"axios": "^0.18.0",
"bandsintown": "^1.0.1",
"dotenv": "^8.0.0",
"inquirer": "^6.3.1",
"moment": "^2.24.0",
"node-spotify-api": "^1.1.1",
"omdb": "^0.8.0"