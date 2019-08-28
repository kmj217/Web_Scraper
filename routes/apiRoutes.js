// Setting up the routes to scrape and retrieve the article data
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {

  // When you visit this route, the server will scrape data from the site and save to mongo
  app.get("/api/scrape", function (req, res) {
    console.log("running scrape");

    // Make an axios call to the website
    axios.get("https://www.desiringgod.org/")
      .then(function (res) {
        // First remove the data from the database so it is not duplicated
        
        let $ = cheerio.load(res.data);
        // Clear the database to account for duplicate articles
        db.Article.deleteMany(function (err, p) {
          if (err) {
            throw err;
          } else {
            console.log('No Of Documents deleted:' + JSON.stringify(p));
          }
        });

        // Loop through each article parent element for the title and link
        $(".js-share-values").each(function (i, element) {
          let title = $(element).attr("data-title");
          let link = $(element).attr("data-link");

          // Insert the title & link into the ArticleDB
          db.Article.create({
            title: title,
            link: link
          });
        });
      }).then(function () {
        // Make sure it worked
        res.send("articles have been scraped");
      });
  });

  // Route to retrieve data from mongo and display it
  app.get("/api/all", function (req, res) {
    console.log("running to retrieve all the articles");
    // Query the mongodb for my scraped data and return it as json object
    db.Article.find({}, function (error, articles) {
      // Log any errors 
      if (error) {
        console.log(error);
      }
      // Send the result to the browser
      else {
        res.json(articles);
      }
    });
  });

  // Route to retrieve data from mongo and display it
  app.get("/api/saved", function (req, res) {
    console.log("running to retrieve all the saved articles");
    // Query the mongodb for my scraped data and return it as json object
    db.Article.find({saved: true}, function (error, savedArticles) {
      // Log any errors 
      if (error) {
        console.log(error);
      }
      // Send the result to the browser
      else {
        res.json(savedArticles);
      }
    });
  });

  app.put("/api/saved", function (req, res) {
    console.log("running to retrieve all the saved articles");
    console.log(req.body.id);
    // Query the mongodb for my scraped data and return it as json object
    db.Article.findOneAndUpdate({_id: req.body.id}, {saved: req.body.saved}, function (error, savedArticles) {
      // Log any errors 
      if (error) {
        console.log(error);
      }
      // Send the result to the browser
      else {
        console.log(savedArticles);
        res.json(savedArticles);
      }
    });
  });

};