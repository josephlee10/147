var models = require('../models');

exports.view = function(req, res) {
	res.render('add');
}

exports.upload = function(req, res) {
	console.log("reached");
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
		"usr_id": "guest",// change this
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
		console.log(docs[0]);
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
    	res.send(newComment);
  	}
};