var models = require('../models');

exports.view = function(req, res){ // This will render what the user uploaded and liked
  models.Project // get the user uploads
  .find({"username": "guest"})
  .exec(renderProjects);

  function renderProjects(err, projects) {
    var nUploads = projects.length;
    var allLikedarr = [];
    models.User
          .find({"usr_name": "guest"}, function (err, docs) {
              var foodIDarr = docs[0].liked;
              if (foodIDarr.length > 0) { // user liked something!
                var to_push_count = foodIDarr.length;
                for (var i = 0; i < foodIDarr.length; i++) {
                  models.Project.find({"_id": foodIDarr[i].food_id}, function (err, foods) {
                    allLikedarr.push(foods[0]);
                    to_push_count--;
                    if (to_push_count <= 0) {
                      if (nUploads > 0) res.render('myFavs', {'showLiked': true,
                                                              'showUploads': true,
                                                              'allFoods': projects,
                                                              'allLikedFoods': allLikedarr});
                      else res.render('myFavs', {'showLiked': true,
                                                 'showUploads': false,
                                                 'allLikedFoods': allLikedarr});
                    }
                  });
                }
              } else { // user didn't like anything
                if (nUploads > 0) res.render('myFavs', {'showLiked': false,
                                                        'showUploads': true,
                                                        'allFoods': projects});
                else res.render('myFavs', {'showLiked': false,
                                           'showUploads': false});
              }
          });

  //   if (nUploads > 0)
  //     res.render('myFavs', {'showUploads': true,
  //                           'allFoods':projects});   
  //   else
  //     res.render('myFavs', {'showUploads': false});
  // }
  }
};

exports.likedFoodInfo = function(req, res) { // This will add 1 to the total likes and push the foodID to the user liked section
  var foodID = req.params.id;

  models.Project.find({"_id":foodID}, function(err, docs){ 
      var totalLikes = docs[0].likes + 1;
      models.Project
            .update({"_id": foodID}, {"likes": totalLikes});
      models.User
            .find({"usr_name": "guest"}, function(err, docs){
                var allLiked = docs[0].liked;
                allLiked.push({
                  "food_id": foodID
                });

                models.User
                      .update({"usr_name": "guest"}, {"liked": allLiked})
                      .exec(afterUpdating);
            });
  });
  
  function afterUpdating(err) {
    if (err) {console.log(err); res.send(500)};
    res.send(foodID);
  }
};

exports.undoLike = function(req, res) { // need to work on this
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

exports.eraseMyUpload = function(req, res) { // This will erase the upload
  var foodID = req.query.id;
  models.Project
        .find({"_id": foodID})
        .remove()
        .exec(afterRemoving);

  function afterRemoving(err) {
      if (err) {console.log(err); res.send(500);}
      res.send(foodID);
  }
};
