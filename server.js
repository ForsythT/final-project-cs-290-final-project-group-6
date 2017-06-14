var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var data = require('./data');
var app = express();

var mongoHost = "classmongo.engr.oregonstate.edu";
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = "cs290_collikyl";
var mongoPassword = "cs290_collikyl";
var mongoDBName = "cs290_collikyl";
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
  '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
var mongoDB;



var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', function (req, res, next) {
	var collection = mongoDB.collection('books');
	console.log(collection);
	collection.find({}).toArray(function (err, bookData) {
		if(err){
			res.status(500).send("Error fetching books from DB.");
		}
		else{
			var templateArgs = {
				bookPostData: bookData,
				title: "Books"
			};
			console.log(templateArgs);
			res.render('bookPostPage', templateArgs)
		}
	});
});

app.post('/addBook',function (req, res, next) {
	console.log("adding book");
	if (req.body){
		var collection = mongoDB.collection('books');
		console.log(req.body);
		var newBook = {
			title: req.body.title,
			edition: req.body.edition,
			author: req.body.author,
			condition: req.body.condition,
			price: req.body.price
		};
		collection.insertOne({
			title: req.body.title,
			edition: req.body.edition,
			author: req.body.author,
			condition: req.body.condition,
			price: req.body.price},
			function(err, result) {
				if (err) {
					console.log("Error detected.\n", err);
					res.status(500).send("Error inserting book into database: " + err);
				}
				else {
					res.status(200).send();
				}
			}
		)
	}
});

app.get('/style.css', function (req, res){
  res.sendFile(path.join(__dirname, 'public', 'style.css'));
});

app.get('/index.js', function (req, res){
  res.sendFile(path.join(__dirname, 'public', 'index.js'));
});

app.get('*', function (req, res) {
  res.status(404);
  res.render('404Page');
});

MongoClient.connect(mongoURL, function (err, db) {
  if (err) {
    throw err;
  }
  mongoDB = db;
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});