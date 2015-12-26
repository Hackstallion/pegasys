var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');


module.exports = {
  updateProfile: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username = req.cookies.user,
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


    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser && foundUser.username === username) {
          
          someOtherUsername ? (res.cookie('user', someOtherUsername), foundUser.username = someOtherUsername) : null;
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



