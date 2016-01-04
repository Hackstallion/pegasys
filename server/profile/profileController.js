var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');


module.exports = {
  updateProfile: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username = req.cookies.user,
        password = req.body.password,
        newPassword = req.body.newPassword;


    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
          
          if (foundUser.password === password){
            foundUser.password = newPassword;
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
              myProfile.password = '';
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



