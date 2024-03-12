// Routes for API version 1.0

const express = require("express");
const zipdb = require("zippity-do-dah");
const weather = require("openweather-apis")

const APIKEY = process.env.OPENWEATHER_KEY;


const api = express.Router();

// Send a JSON response 
api.get('/', function(request, response) {
  response.json({
    "Help":"Use a zip code to get the temperature"
  });
});

// Match on URLs with a 5 digit zip code
api.get(/^\/(\d{5})$/, function(req, res, next) {
    
  // get the zip from route regex group
  var zipcode = req.params[0];
  // Get location information from zip code
  var location = zipdb.zipcode(zipcode);
  if (!location.zipcode) {
    next();
    return;
  }
  // Get lat and long from location data
  var latitude = location.latitude;
  var longitude = location.longitude;
  console.log(APIKEY);
  
  // configure library
  weather.setLang('en');
  weather.setCoordinate(latitude, longitude);
  weather.setUnits("imperial");
  weather.setAPPID(APIKEY);
  
  // Query OpenWeather One Call API and extract temp 
  weather.getAllWeather(function(err, data){
    let results = {
      "zipcode": zipcode,
      "temperature": data['main']['temp']
    };
    if(err){
      results = err;
    }
    res.json(results);
  })

});

// Show a 404 for other routes
api.use(function(req, res) {
  res.status(404).json({"error":"Zip code"});
});

// Don't forget to export!
module.exports = api;