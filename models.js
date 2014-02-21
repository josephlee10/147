
var Mongoose = require('mongoose');


var ProjectSchema = new Mongoose.Schema({
  // fields are defined here
	"food_name": String,
	"description": String,
	"imageURL": String,
	"recipe": String,
	"tags": String,
	"likes": Number,
	"comments": [{
		"username": String,
		"comment": String
	}]
});

exports.Project = Mongoose.model('Project', ProjectSchema);
