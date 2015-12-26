var UserModel = require('../../database/config.js');
var Users = UserModel.users;
var Q = require('q');

//Daniel, what did you mean by do it with a cookie?

module.exports = {
  updateProfile: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username = req.body.username,
        someOtherUsername = req.body.otherName,
        password = req.body.password,
        route = req.body.route,
        bounds = req.body.bounds,
        driverStatus = req.body.driver,
        matched = req.body.matched,
        startPoint = req.body.startPoint,
        endPoint = req.body.endPoint,
        matchRequests = req.body.matchRequests,
        startTime = req.body.startTime,
        endTime = req.body.endTime,
        inbox = req.body.inbox,
        sent = req.body.sent;
//If we don't want any of these attributes to be
//editable, we can restrict this module's 
//access to them.

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser && foundUser.loggedIn === true) {
          // testing loggedIn operator
          // req.body.loggedIn === false ? foundUser.loggedIn = req.body.loggedIn : null;
          
          someOtherUsername ? foundUser.username = someOtherUsername : null;
          password ? foundUser.password = password : null;
          route ? foundUser.route = route : null;
          bounds ? foundUser.bounds = bounds : null;
          driverStatus ? foundUser.driver = driverStatus : null;
          matched ? foundUser.matched = matched : null;
          startPoint ? foundUser.startPoint = startPoint : null;
          endPoint ? foundUser.endPoint = endPoint : null;
          matchRequests ? foundUser.matchRequests = matchRequests : null;
          startTime ? foundUser.startTime = startTime : null;
          endTime ? foundUser.endTime = endTime : null;
          inbox ? foundUser.inbox = inbox : null;
          sent ? foundUser.sent = sent : null;
          
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
      //requires sending 'username' header with GET request...
        username = req.cookies.user;
        
        findUser({username: username})
          .then(function(myProfile) {
            if (myProfile && myProfile.loggedIn === true) {
              console.log("myProfile", myProfile);
              res.status(200);
              res.json(myProfile);
            } else {
              res.sendStatus(401);
            }
          })
          .fail(function (error) {
            next(error);
          });
  }
}



