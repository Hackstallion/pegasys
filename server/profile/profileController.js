var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');


module.exports = {
  updateProfile: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username = req.cookies.user,
        password = req.body.password,
        route = req.body.route,
        bounds = req.body.bounds,
        driverStatus = req.body.driver,
        startPoint = req.body.startPoint,
        endPoint = req.body.endPoint,
        startTime = req.body.startTime,
        endTime = req.body.endTime;


    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
          
          foundUser.password = password || foundUser.password;
          foundUser.route = route || foundUser.route;
          foundUser.bounds = bounds || foundUser.bounds;
          foundUser.driver = driverStatus || false;
          foundUser.startPoint = startPoint || foundUser.startPoint;
          foundUser.endPoint = endPoint || foundUser.endPoint;
          foundUser.startTime = startTime || foundUser.startTime;
          foundUser.endTime = endTime || foundUser.endTime;
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



