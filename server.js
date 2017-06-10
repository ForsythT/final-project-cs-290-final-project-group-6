var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var data = require('./data');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {
  var templateArgs = {
    bookPostData: data,
    butto: true
  }
  res.render('bookPostPage', templateArgs)
});

app.get('*', function (req, res) {
  res.status(404);
  res.render('404Page');
});

// Start the server listening on the specified port.
app.listen(port, function () {
  console.log("== Server listening on port", port);
});
