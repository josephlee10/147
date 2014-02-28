var models = require('../models');

exports.projectInfo = function(req, res) {
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback
  models.Project
    .find({"_id": projectID})
    .exec(afterQuery);

    function afterQuery(err, projects) {
      if(err) console.log(err);
      res.json(projects[0]);
    }
}

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

exports.deleteProject = function(req, res) {
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