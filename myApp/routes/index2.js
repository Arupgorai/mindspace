var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/mspace');
var Schema = mongoose.Schema;

var	userDataSchema = new Schema({
		title: {type: String, required: true},
		content: String,
		author: String
});                     /*, {collection: 'users'}*/

var UserData = mongoose.model('file', userDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index2', { title: 'Mongo testing'});
});

router.get('/get-data', function(req, res, next){
	UserData.find().then(function(item){
		res.render('index2', {items: item});
	});
});

router.post('/insert', function(req, res, next){
	var item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};
	var data = new UserData(item);
	data.save();

	res.redirect('/home');
});

router.post('/update', function(req, res, next){
	console.log("body",req.body)
	var id = req.body.id;

	UserData.findById(id, function(err, doc){
		if (err){
			console.error('error, no entry found');
		}
		doc.title = req.body.title;
		doc.content = req.body.content;
		doc.author = req.body.author;
		doc.save();
	});
	res.redirect('/home');
});

router.post('/delete', function(req, res, next){
	var id = req.body.id;

	UserData.findByIdAndRemove(id).exec();
	res.redirect('/home');
});



module.exports = router;
