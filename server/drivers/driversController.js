var UserModel = require('../../database/config.js');
var Users = UserModel.users;
var Q = require('q');


module.exports = {
  getDrivers: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        findDrivers = Q.nbind(Users.find, Users),
      //requires sending 'username' header with GET request...
        username = req.headers['username'];
        
    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser && foundUser.loggedIn === true) {
          findDrivers({driver: true, matched: 0})
            .then(function(drivers) {
              if (drivers) {
                //What do we do with them?
                console.log("drivers", drivers);
                res.sendStatus(200);
              } else {
                res.sendStatus(404);
              }
            })
            .fail(function (error) {
              next(error);
            })
         } else {
          res.sendStatus(401);
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
}


