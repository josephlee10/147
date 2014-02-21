var models = require("../models");

exports.view = function(req, res) {
	res.render('add');
}

exports.addFood = function(req, res) {

	var name = req.query.name;
	var des = req.query.description;
	var imageURL = req.query.image;
	var recipe = req.query.recipe;
	var tag = req.query.tag;

	var food_data = {
		"food_name": name,
		"description": des,
		"imageURL": imageURL,
		"recipe": recipe,
		"tags": tag,
		"likes": 0
	}

	var newFood = new models.Project(food_data);
	newFood.save(afterSaving);
	function afterSaving(err) {
		if (err) {
			console.log(err);
			res.send(500);
		}

		res.redirect('/');
	}

	// data["allFoods"].push(newFood);
	// res.render('add');   
};

exports.addComments = function(req, res) {
	var comment = req.query.comments;
	var foodID = req.query.id;

	var newComment = {
		"username": "leahkim",
		"comment": comment
	}

	data["allFoods"][foodID - 1]["comments"].push(newComment);
	res.render('index', data);   
};

exports.addLikes = function(req, res) {
	var likes = req.query.likes + 1;
	var foodID = req.query.id;


	data["allFoods"][foodID - 1]["likes"].push(likes);
	res.render('index', data);   
};