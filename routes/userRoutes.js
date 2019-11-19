let db = require('../models')

module.exports = function (app) {
  // Get all examples

  app.get("/api/user", function(req, res) {
    db.User.findAll({}).then(function(user) {
      res.json(user);
    });
  });


  app.post("/api/new", function (req, res){
    console.log(req.body);
    console.log(req.body.name)
    db.User.create({name: req.body.name}).then(function(results) {
      res.json(results)
    })
  })



  // app.post("/api/new", function (req, res){
  //   console.log(req.body);
  //   db.User.create({
  //    userName: req.body.email
  //   }).then(function(results) {
  //     res.json(results)
  //   })
  // })

  
//   Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
};
