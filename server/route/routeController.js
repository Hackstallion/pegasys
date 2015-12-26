var UserModel = require('../../database/config.js');
var Users = UserModel.users;
var Q = require('q');

module.exports = {
  setRoute: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username  = req.body.username,
        route = req.body.route,
        bounds = req.body.bounds,
        driverStatus = req.body.driver;

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser && foundUser.loggedIn === true) {
          foundUser.route = route;
          foundUser.bounds = bounds;
          foundUser.driver = driverStatus;
          foundUser.save();
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
}
