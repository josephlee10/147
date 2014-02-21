// Get all of our friend data
var data = require('../models');

exports.view = function(req, res){

data.Project
	.find()
	.sort("-likes")
	.exec(renderProjects);

	function renderProjects(err, projects) {
	  res.render('index', {'allFoods':projects});		
	}

  // res.render('index', data);
};

// function addMyFavs(name) {
// 	console.log("hi");
// 	var newMyFavs = {
// 		"name": name
// 	};
// 	data["myFavs"].push("newMyFavs");
// 	console.log(data["myFavs"]);
// };
