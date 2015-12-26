var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');


module.exports = {
  getDrivers: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        findDrivers = Q.nbind(Users.find, Users),
        username = req.cookies.user;
        
    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
          
          findDrivers({driver: true, matched: 0})
            .then(function(drivers) {
              if (drivers) {
                res.json(drivers);
                res.status(200);
              } else {
                res.sendStatus(404);
              }
            })
            .fail(function (error) {
              next(error);
              res.sendStatus(400);
            })
            
         } else {
          res.sendStatus(401);
        }
      })
      .fail(function (error) {
        next(error);
        res.sendStatus(400);
      });
  }
}


