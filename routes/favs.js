var models = require('../models');

exports.view = function(req, res){ // This will show the pictures 'guest' has uploaded

  models.Project
  .find({"username": "guest"})
  .exec(renderProjects);

  function renderProjects(err, projects) {
    res.render('myFavs', {'allFoods':projects});   
  }
};

exports.viewLikedFoods = function(req, res) { // This will show the pictures 'guest' has liked

};

exports.likedFoodInfo = function(req, res) {
  var foodID = req.params.id;

  models.Project.find({"_id":foodID}, function(err, docs){ 
      var totalLikes = docs[0].likes;
      models.Project
            .update({"_id": foodID}, {"likes": totalLikes})
            .exec(afterUpdating);
  });
  
  function afterUpdating(err) {
    res.send(foodID);
  }
};

exports.undoLike = function(req, res) {
  var foodID = req.params.id;
  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();

  // models.Project
  //   .find({"_id": projectID})
  //   .remove()
  //   .exec(afterRemoving);

  //   function afterRemoving(err, projects) {
  //     res.send();
  //   }
  res.send(foodID);
};

exports.eraseMyUpload = function(req, res) {
  var foodID = req.params.id;
  res.send(foodID);
};
