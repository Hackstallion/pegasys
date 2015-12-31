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
          var regex = new RegExp("^((?!" + foundUser.username + ").)*$");
          //Find all users but self
          findUsers({username: regex})
            .then(function(users) {
              if (users) {
                console.log("users:", users);
                users.forEach(function(user){
                  user.password=null;
                  user.inbox=null;
                  user.sent=null;
                  user.matchRequests=null;
                });
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


