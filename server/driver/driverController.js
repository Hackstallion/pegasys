var UserModel = require('../../database/config.js');
var Users = UserModel.users;
var Q = require('q');

module.exports = {
  switchDriver: function (req, res, next) {
    var username  = req.body.username,
        findUser = Q.nbind(Users.findOne, Users);

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
//NOT SURE HOW 'THIS' WILL PLAY OUT
          if (this.driver === true) {
            this.driver = false;
          } else {
            this.driver = true;
          }
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
