
var Mongoose = require('mongoose');


var ProjectSchema = new Mongoose.Schema({
  // fields are defined here
  	"username": String,
	"food_name": String,
	"description": String,
	"imageFile": String,
	"recipe": String,
	"tags": String,
	"likes": Number,
	"comments": [{
		"comment_usr_id": String,
		"comment": String
	}]
});

var UserSchema = new Mongoose.Schema({
	"usr_name": String,
	"password": String,
	"liked": [{
			"food_id": String
			}]
});

exports.Project = Mongoose.model('Project', ProjectSchema);
exports.User = Mongoose.model('User', UserSchema);
