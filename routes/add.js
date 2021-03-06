var models = require('../models');

var fs = require('fs');

exports.view = function(req, res) {
	res.render('add');
}

exports.upload = function(req, res, next) {
	console.log("homie");

	var asdf = req.files;
	console.log(asdf);

	res.redirect('/');

}

exports.addFood = function(req, res) {

	var image = req.files
	console.log(image);


	var name = req.query.name;
	var des = req.query.description;
	var imageFile = req.query.image;
	var recipe = req.query.recipe;
	var tag = req.query.tag;

	var food_data = {
		"username": "guest",
		"food_name": name,
		"description": des,
		"imageFile": imageFile,
		"recipe": recipe,
		"tags": tag,
		"likes": 0
	}

	var newFood = new models.Project(food_data);
	newFood.save(afterSaving);
	
	function afterSaving(err) {
		if (err) {console.log(err);	res.send(500);}
		res.redirect('/');
	}
};

exports.addComments = function(req, res) {
	var comment = req.query.comments;
	var foodID = req.query.id;
	var newComment = {
		"comment_usr_id": "guest",
		"comment": comment
	};

	models.Project
	.find({"_id": foodID}, function (err, docs) {
		// console.log(docs[0]);
    	var allComments = docs[0].comments;

    	allComments.push({
    		"comment_usr_id": "guest",
			"comment": comment	
    	});

    	console.log(allComments);

    	models.Project
    		  .update({"_id": foodID},{"comments": allComments})
    		  .exec(afterUploadingComment);
	});

	function afterUploadingComment(err) {
		if (err) {console.log(err); res.send(500)};
		var photo_id = {"photo_id": foodID};
		var comment_and_id = [newComment, photo_id];

		// pass in comment_and_id here so that the call back 
		//function commentFood in hci-friends can locate which modal popup to edit
    	res.send(comment_and_id);
  	}
};