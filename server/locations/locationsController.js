var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');

module.exports = {
  setRoute: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username  = req.cookies.user,
        driverStatus = req.body.driver,
        loc1 = req.body.startPoint,
        loc2 = req.body.endPoint,
        route = req.body.route,
        bounds = req.body.bounds;

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
          foundUser.driver = driverStatus || false;
          foundUser.startPoint = loc1 || foundUser.startPoint;
          foundUser.endPoint = loc2 || foundUser.endPoint;
          foundUser.route = route || foundUser.route;
          foundUser.bounds = bounds || foundUser.bounds;
          foundUser.save();
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      })
      .fail(function (error) {
        next(error);
        res.sendStatus(404);
      });
  }
}
