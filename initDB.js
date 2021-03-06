
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'FoodBytes';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data
var allData_json = require('./data.json');
var projects_json = allData_json.Projects;
var users_json = allData_json.Users;

// Step 2: Remove all existing documents
models.Project
  .find()
  .remove()
  .exec(clearUserDB); // callback to continue at

function clearUserDB(err) {
  models.User.find().remove().exec(onceClear);
}

// Step 3: load the data from the JSON file
function onceClear(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = projects_json.length;
  for(var i=0; i<projects_json.length; i++) {
    var json = projects_json[i];
    var proj = new models.Project(json);

    proj.save(function(err, proj) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('Food DONE');
        // The script won't terminate until the 
        // connection to the database is closed
        mongoose.connection.close()
      }
    });
  }

  var to_save_count_user = users_json.length;
  for(var i=0; i<users_json.length; i++) {
    var json = users_json[i];
    var proj = new models.User(json);

    proj.save(function(err, proj) {
      if(err) console.log(err);

      to_save_count_user--;
      console.log(to_save_count_user + ' left to save');
      if(to_save_count_user <= 0) {
        console.log('User DONE');
        // The script won't terminate until the 
        // connection to the database is closed
      }
    });
  }

}

