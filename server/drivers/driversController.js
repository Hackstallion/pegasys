var UserModel = require('../../database/config.js');
var Users = UserModel.users;
var Q = require('q');

//This looks messy because I tried to implement
//login verification based on user's username but
//didn't get to figure out username verification
//on a GET request, so I commented that out for now.

module.exports = {
  getDrivers: function (req, res, next) {
    var findUser = Q.nbind(Users.find, Users);
        // username = req.body.username;
        
    // findUser({username: username})
    //   .then(function(foundUser) {
    //     if (foundUser && foundUser.loggedIn === true) {
          findUser({driver: true, matched: 0})
            .then(function(drivers) {
              //What do we do with them?
              if (drivers) {
                console.log("drivers", drivers);
                res.sendStatus(200);
              }
            // })
         else {
          // console.log("request body", req.body);
          res.sendStatus(401);
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
}
