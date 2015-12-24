var UserModel = require('../../database/config.js');
var Users = UserModel.users;
var Q = require('q');

module.exports = {
  setInitial: function (req, res, next) {
    var username  = req.body.username,
        findUser = Q.nbind(Users.findOne, Users),
        //from API_spec layout
        loc1 = req.body.startPoint,
        loc2 = req.body.endPoint,
        driverStatus = req.body.driver;

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
//NOT SURE HOW 'THIS' WILL PLAY OUT
          this.startPoint = loc1;
          this.endPoint = loc2;
          this.driver = driverStatus;
          res.status(200).send();
        } else {
          res.status(401).send();
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
}