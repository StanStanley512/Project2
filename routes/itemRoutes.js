let db = require("../models")

module.exports = function(app) {
    app.post("/api/newItem", function (req, res){
        console.log(req.body);
        // console.log(req.body.name)
        db.Item.create(req.body)
        .then(function(results) {
          res.json(results)
        })
      }) 

    app.get("/api/user/:id", function(req, res) {
      console.log(req.params.id)
      db.Item.findAll({
        
        where: {
          UserId: req.params.id 
        },
        include: [db.User]
      }).then(function(podcast) {
        res.json(podcast);
      });
    });

    app.get("/api/user/:id/:category", function(req, res) {
      console.log(req.params.id)
      db.Item.findAll({
        where: {
          UserId: req.params.id, 
          category: req.params.category
        },
        include: [db.User]
      }).then(function(podcast) {
        res.json(podcast);
      });
    });

    app.get("/api/movie", function(req, res) {
      db.User.findAll({}).then(function(movie) {
        res.json(movie);
      });
    });

    app.delete("/api/item/:id", function(req, res) {
      db.Item.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(item) {
        res.json(item);
      });
    });

}
