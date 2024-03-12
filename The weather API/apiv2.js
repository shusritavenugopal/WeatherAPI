const express = require("express");
const zipdb = require("zippity-do-dah");
const weather = require("openweather-apis")

const APIKEY = process.env.OPENWEATHER_KEY;


const api = express.Router();

// Send a JSON response 
api.get("/", function (request, response) {
  response.json({
    Help: "Use a /v2 and zip code to get the temperature, windchill, or description for v2",
  });
});

api.get("/v2", function (request, response) {
  response.json({
    Help: "Use a zip code to get the temperature, windchill, or description for v2",
  });
});

// Match on URLs with a 5 digit zip code
api.get("/v2/temp/:zip", function (req, res, next) {
  var zipcode = req.params.zip;
  var location = zipdb.zipcode(zipcode);
  if (!location.zipcode) {
    next();
    return;
  }
  var latitude = location.latitude;
  var longitude = location.longitude;

  weather.setLang("en");
  weather.setCoordinate(latitude, longitude);
  weather.setUnits("imperial");
  weather.setAPPID(APIKEY);

  weather.getAllWeather(function (err, data) {
    let results = {
      zipcode: zipcode,
      temperature: data.main.temp,
    };
    if (err) {
      results = err;
    }
    res.json(results);
  });
});

api.get("/v2/windchill/:zip", function (req, res, next) {
  var zipcode = req.params.zip;
  var location = zipdb.zipcode(zipcode);
  if (!location.zipcode) {
    next();
    return;
  }
  var latitude = location.latitude;
  var longitude = location.longitude;

  weather.setLang("en");
  weather.setCoordinate(latitude, longitude);
  weather.setUnits("imperial");
  weather.setAPPID(APIKEY);

  weather.getAllWeather(function (err, data) {
    let results = {
      zipcode: zipcode,
      windchill: data.main.feels_like,
    };
    if (err) {
      results = err;
    }
    res.json(results);
  });
});

api.get("/v2/description/:zip", function (req, res, next) {
  var zipcode = req.params.zip;
  var location = zipdb.zipcode(zipcode);
  if (!location.zipcode) {
    next();
    return;
  }
  var latitude = location.latitude;
  var longitude = location.longitude;

  weather.setLang("en");
  weather.setCoordinate(latitude, longitude);
  weather.setUnits("imperial");
  weather.setAPPID(APIKEY);

  weather.getAllWeather(function (err, data) {
    let results = {
      zipcode: zipcode,
      forecast: data.weather[0].description,
    };
    if (err) {
      results = err;
    }
    res.json(results);
  });
});

// Show a 404 for other routes
api.use(function(req, res) {
  res.status(404).json({"error":"Zip code"});
});

// Don't forget to export!
module.exports = api;