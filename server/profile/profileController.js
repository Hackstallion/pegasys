var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');


module.exports = {
  updateProfile: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users);
    var username = req.cookies.user;
    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
          for (var key in req.body){
            foundUser[key] = req.body[key];
          }
          foundUser.save();
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  getProfile: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username = req.cookies.user;
        
        findUser({username: username})
          .then(function(myProfile) {
            if (myProfile) {
              console.log("myProfile", myProfile);
              res.json(myProfile);
              res.status(200);
            } else {
              res.sendStatus(401);
            }
          })
          .fail(function (error) {
            next(error);
          });
  }
}



