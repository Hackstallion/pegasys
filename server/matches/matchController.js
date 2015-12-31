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
            if (req.cookies.user === acceptor.username) {
              //the above will only happen when both .matcheds are 0
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
            if (req.cookies.user === requestor.username) {
              requested.matchRequests.push(requestor.username);
              requested.save();
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
  }
}

