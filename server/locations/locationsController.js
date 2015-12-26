var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');

module.exports = {
  setInitial: function (req, res, next) {
    var username  = req.cookies.user,
        findUser = Q.nbind(Users.findOne, Users),
        loc1 = req.body.startPoint,
        loc2 = req.body.endPoint,
        driverStatus = req.body.driver;

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
          foundUser.startPoint = loc1;
          foundUser.endPoint = loc2;
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
