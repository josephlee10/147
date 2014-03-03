exports.login = function(req, res) {
  // remember the username
  var username = req.query.username;
  console.log('username is: '+username);
  req.session.username = username;

  // send them back to the homepage
  res.redirect('/');
}

exports.logout = function(req, res) {
  req.session.username = null;

  res.redirect('/');
}