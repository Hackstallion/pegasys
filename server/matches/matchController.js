var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');

/*
   proposed request body: {
                            from_id: integer,
                            to_id: integer
                          }
    The code below assumes string usernames are 
    used in place of integer id's.
*/

module.exports = {

  acceptRequest: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        acceptor = req.body.from_id,
        accepted = req.body.to_id;

    findUser({username: acceptor})
      .then(function(acceptor) {

        findUser({username: accepted})
          .then(function(accepted) {
            if (req.cookies.user === acceptor.username 
              && acceptor.matched === accepted.matched) {
              //the above will only happen when both .matcheds are 0
                console.log("accepted.username", accepted.username);
                acceptor.matched = accepted.username;
                console.log("acceptor.matched:", acceptor.matched);
                accepted.matched = acceptor.username;
                var requestIndex = acceptor.matchRequests.indexOf(accepted.username);
                acceptor.matchRequests.splice(requestIndex, 1);
                acceptor.save();
                accepted.save();
                res.sendStatus(200);
            } else {
              res.sendStatus(401);
            }
          })
          .fail(function(error) {
            next(error);
            res.sendStatus(404);
          })

      })
      .fail(function(error) {
        next(error);
        res.sendStatus(404);
      })

  },

  requestMatch: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        requested = req.body.to_id,
        requestor = req.body.from_id;

    findUser({username: requested})
      .then(function(requested) {

        findUser({username: requestor})
          .then(function(requestor) {
            if (req.cookies.user === requestor.username 
                && requestor.driver !== requested.driver 
                  && requestor.matched === "0") {
              requested.matchRequests.push(requestor.username);
              requested.save();
              res.sendStatus(200);
            } else {
              console.log("requestor.driver !== requested.driver", requestor.driver !== requested.driver);
              console.log("requestor.matched === 0", requestor.matched === 0);
              res.sendStatus(401);
            }
          })
          .fail(function(error) {
            next(error);
            res.sendStatus(404);
          })

      })
      .fail(function(error) {
        next(error);
        res.sendStatus(404);
      })
  },

  unmatch: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        unmatchee = req.body.to_id,
        unmatcher = req.body.from_id;

    findUser({username: unmatcher})
      .then(function(unmatcher) {

        findUser({username: unmatchee})
          .then(function(unmatchee) {
            if (req.cookies.user === unmatcher.username) {
              unmatchee.matched = 0;
              unmatcher.matched = 0;
              unmatchee.save();
              unmatcher.save();
              res.sendStatus(200);
            } else {
              res.sendStatus(401);
            }
          })
          .fail(function(error) {
            next(error);
            res.sendStatus(404);
          })      
        })
      .fail(function(error) {
        next(error);
        res.sendStatus(400);
      })
  }
}

