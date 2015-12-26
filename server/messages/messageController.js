var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');

module.exports = {
  showInbox: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username = req.headers['username'];

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser && foundUser.loggedIn === true) {
          console.log("foundUser.inbox => ", foundUser.inbox);
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  showSent: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username = req.headers['username'];
        
    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser && foundUser.loggedIn === true) {
          console.log("foundUser.sent => ", foundUser.sent);
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  sendMessage: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        recipient = req.body.to_id,
        sender = req.body.from_id,
        text = req.body.string;

    findUser({username: sender})
      .then(function(sender) {
        if (sender && sender.loggedIn === true) {
          sender.sent.push(text);
          sender.save();
          console.log("Message in sent folder");

          findUser({username: recipient})
            .then(function(recipient) {
              recipient.inbox.push(text);
              recipient.save();
              res.sendStatus(200);
            })
            .fail(function (error) {
              next(error);
              res.sendStatus(404);
            })
        } else {
          res.sendStatus(401);
        }
      })
      .fail(function (error) {
        next(error);
        res.sendStatus(400);
      })

    
  }
}
