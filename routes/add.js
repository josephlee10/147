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

	var newComment = new models.Project ({
		"username": "leahkim",
		"comment": comment
	});

  	newComment.save({"_id": foodID}, afterSaving); // something is wrong here

	function afterSaving(err) {
		if (err) {console.log(err); res.send(500)};
    	res.redirect('/');
  	}
};