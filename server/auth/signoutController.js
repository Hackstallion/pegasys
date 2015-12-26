var UserModel = require('../../database/config.js');
var Users = UserModel.users;
var Q = require('q');


module.exports = {
  signout: function (req, res, next) {
    var username = req.body.username,
        findUser = Q.nbind(Users.findOne, Users);

    findUser({username: username})
      .then(function (user) {
        user.loggedIn = false;
        user.save();
        res.sendStatus(200);
      })
      .fail(function (error) {
        next(error);
        res.sendStatus(400);
      });
  }
}

