require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static directory
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"))
// // Routes
// =============================================================

require("./routes/htmlRoutes")(app);
require("./routes/itemRoutes")(app);
require("./routes/userRoutes")(app);

// Starts the server to begin listening
// =============================================================

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

module.exports = app;
