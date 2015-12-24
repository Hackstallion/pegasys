var UserModel = require('../../database/config.js');
var Q = require('q');

module.exports = {
  switchRider: function (req, res, next) {
    var username  = req.body.username,
        findUser = Q.nbind(UserModel.findOne, UserModel),
        //from API_spec layout
        loc1 = req.body.startPoint,
        loc2 = req.body.endPoint;

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
//NOT SURE HOW 'THIS' WILL PLAY OUT
          this.startPoint = loc1;
          this.endPoint = loc2;
          this.driver = false;
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