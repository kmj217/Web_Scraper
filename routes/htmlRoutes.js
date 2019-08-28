const db = require('../models');

module.exports = function (app) {

  app.get('/', function (req, res) {
    db.Article.find({}, (error, dbArticle) => {
      if (error) {
        console.log(error);
      }
      console.log(dbArticle)
      // res.send(dbArticle)
      res.render('index', {
        articles: dbArticle
      });
    })
  });
}