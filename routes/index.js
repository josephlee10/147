// Get all of our friend data
var data = require('../models');

exports.view = function(req, res){

data.Project
	.find()
	.sort("-likes")
	.exec(renderProjects);

	function renderProjects(err, projects) {
		var data = {'showAlternate': false};
		res.render('index', {'allFoods':projects});		
	}
};

exports.viewAlternate = function(req, res) {
	data.Project
	.find()
	.sort("-likes")
	.exec(renderProjects);

	function renderProjects(err, projects) {
		var data = {'showAlternate': true};
		res.render('index', {'allFoods':projects});		
	}
};
