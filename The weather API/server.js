
// init libraries
const path = require("path");
const express = require('express');


const apiv1 = require("./apiv1.js");
const apiv2 = require("./apiv2.js");


// create app 
const app = express();


// Use the routes defined in apiv1.js 
// app.use("/", apiv1);

// Add code to use the v2 API here
app.use("/", apiv2)
app.use("/v2", apiv2);

// Show a 404 for other routes
app.use(function(req, res) {
  res.status(404).json({"error":"Invalid API Request"});
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
