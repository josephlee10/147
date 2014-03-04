exports.login = function(req, res) {
  // remember the username
  var username = req.query.username;
  var password = req.query.password;

password.prototype.hashCode = function(){ // copied from Javascript implementation of Java's String.hashCode() method
    var hash = 0, i, char;
    if (this.length == 0) return hash;
    for (i = 0, l = this.length; i < l; i++) {
        char  = this.charCodeAt(i);
        hash  = ((hash<<5)-hash)+char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

  console.log('username is: '+username);
  req.session.username = username;

  res.redirect('/myFavs');
}

exports.logout = function(req, res) {
  req.session.username = null;

  res.redirect('/');
}
