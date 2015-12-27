var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');

module.exports = {
  setRoute: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username  = req.cookies.user,
        loc1 = req.body.startPoint,
        loc2 = req.body.endPoint,
        route = req.body.route,
        bounds = req.body.bounds;

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
          loc1 ? foundUser.startPoint = loc1 : null;
          loc2 ? foundUser.endPoint = loc2 : null;
          route ? foundUser.route = route : null;
          bounds ? foundUser.bounds = bounds : null;
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
