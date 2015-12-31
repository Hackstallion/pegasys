var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');


module.exports = {
  getUsers: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        findUsers = Q.nbind(Users.find, Users),
        username = req.cookies.user;
        
    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {

          //Find users with the opposite driver/rider status
          findUsers({driver: !foundUser.driver, matched: "0"})
            .then(function(users) {
              if (users) {
                users.forEach(function(user){
                  user.password=null;
                  user.inbox=null;
                  user.sent=null;
                  user.matchRequests=null;
                });
                console.log(users);
                res.json(users);
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
  },

  getAllUsers: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        findUsers = Q.nbind(Users.find, Users),
        username = req.cookies.user;
        
    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {

          //Find users with the opposite driver/rider status
          findUsers({username: !foundUser.username})
            .then(function(users) {
              if (users) {
                users.forEach(function(user){
                  user.password=null;
                  user.inbox=null;
                  user.sent=null;
                  user.matchRequests=null;
                });
                console.log(users);
                res.json(users);
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


