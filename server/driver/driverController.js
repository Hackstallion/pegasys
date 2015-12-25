var UserModel = require('../../database/config.js');
var Users = UserModel.users;
var Q = require('q');

module.exports = {
  switchDriver: function (req, res, next) {
    var username  = req.body.username,
        findUser = Q.nbind(Users.findOne, Users);
// This method, used on line 21, didn't work...
// saveUser = Q.nbind(Users.save, Users);

    findUser({username: username})
      .then(function(foundUser) {
        console.log("foundUser.driver before switch => ", foundUser.driver);
        if (foundUser && foundUser.loggedIn === true) {
          if (foundUser.driver === true) {
            foundUser.driver = false;
          } else {
            foundUser.driver = true;
          }
          // saveUser(foundUser);
          foundUser.save();  //see config.js
          console.log("foundUser.driver after switch => ", foundUser.driver);
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
