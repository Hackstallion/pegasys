var UserModel = require('../../database/config.js');
var Q = require('q');

module.exports = {
  switchDriver: function (req, res, next) {
    var username  = req.body.username,
        driver  = req.body.driver,

        findUser = Q.nbind(UserModel.findOne, UserModel);

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
          //NOT SURE HOW 'THIS' WILL PLAY OUT ON LINE 15
          this.driver = driver;
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
