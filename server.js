// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = express();

// Set up middleware
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Article";

mongoose.connect(MONGODB_URI, function(err) {
  if (err) {
      console.log(err);
  }
  else {
      console.log("Mongoose connection is successful.");
  }
});

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Listen on port 3000
app.listen(PORT, function () {
  console.log(`App running on port ${PORT}`);
});