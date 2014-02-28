var models = require('../models');

exports.view = function(req, res){

  models.Project
  .find()
  .sort("-likes")
  .exec(renderProjects);

  function renderProjects(err, projects) {
    res.render('myFavs', {'allFoods':projects});   
  }

};

exports.likedFoodInfo = function(req, res) {
  var foodID = req.params.id;
  // var totalLikes = models.Project.find({}) + 1;

  // models.Project
  //       .update({"_id":foodID}, {"likes": totalLikes})
  //       .exec(afterUpdating);

  // function afterUpdating(err) {
  //   res.send();
  // }

  res.send(foodID);
}

exports.deleteProjects = function(req, res) {
  var projectID = req.params.id;
  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();

  models.Project
    .find({"_id": projectID})
    .remove()
    .exec(afterRemoving);

    function afterRemoving(err, projects) {
      res.send();
    }
}