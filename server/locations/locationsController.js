var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');

module.exports = {
  tripEdit: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username  = req.cookies.user,
        tripName = Object.keys(req.body)[0];

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
          var oldTrips = JSON.parse(foundUser.trips);
          if (req.body[tripName]["remove"]) {
            delete oldTrips[tripName];
          } else if (oldTrips[tripName]) {
            for (var key in req.body[tripName]) {
              oldTrips[tripName][key] = req.body[tripName][key];
            }
          } else {
            oldTrips[tripName] = req.body[tripName];
          }
          foundUser.trips = JSON.stringify(oldTrips);
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



