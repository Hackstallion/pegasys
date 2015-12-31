var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');

module.exports = {
  newTrip: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username  = req.cookies.user,
        tripName = Object.keys(req.body)[0];

    console.log("tripName", tripName);
    console.log("username", username);

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
          var oldTrips = JSON.parse(foundUser.trips);
          oldTrips[tripName] = req.body[tripName];
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
  },

  delTrip: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username  = req.cookies.user,
        tripName = Object.keys(req.body)[0];

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
          var oldTrips = JSON.parse(foundUser.trips);
          delete oldTrips[tripName];
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




