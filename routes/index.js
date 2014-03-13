// Get all of our friend data
var data = require('../models');

exports.view = function(req, res){

data.Project
	.find()
	.sort("-likes")
	.exec(renderProjects);

	function renderProjects(err, projects) {
		var data = {'allFoods': projects};
		res.render('index', data);		
	}
};