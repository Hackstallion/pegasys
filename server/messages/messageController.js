var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');

module.exports = {
  showInbox: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        username = req.cookies.user;

    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
          res.status(200);
          res.json(foundUser.inbox);
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
        username = req.cookies.user;
        
    findUser({username: username})
      .then(function(foundUser) {
        if (foundUser) {
          console.log("foundUser.sent => ", foundUser.sent);
          res.status(200);
          res.json(foundUser.sent);
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
        text = req.body.text;

    findUser({username: sender})
      .then(function(sender) {
        console.log(req.cookies.user);
        console.log(sender.username);
        if (sender && req.cookies.user === sender.username) {
          var message = JSON.stringify({from_id: sender.username,
                         to_id: recipient,
                         text: text});
          sender.sent.push(message);
          console.log(message);
          sender.save();
          console.log("Message in sent folder");

          findUser({username: recipient})
            .then(function(recipient) {
              recipient.inbox.push(message);
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

    
  },
  delMessage: function (req, res, next) {
    var findUser = Q.nbind(Users.findOne, Users),
        recipient = req.body.to_id,
        sender = req.body.from_id,
        text = req.body.text;

    findUser({username: recipient})
      .then(function(recipient) {
        if (recipient && req.cookies.user === recipient.username) {
          var message = JSON.stringify({from_id: sender,
                         to_id: recipient.username,
                         text: text});
          console.log('message : '+message);
          console.log(req.body);
          var index = recipient.inbox.indexOf(message);
          console.log(index);
          if (index >= 0){
            recipient.inbox.splice(index,1);
          }
          console.log(message);
          recipient.save();
          console.log("Message in sent folder");

          findUser({username: sender})
            .then(function(sender) {
              var index = sender.sent.indexOf(message) ;
              if (index >= 0){
                sender.sent.splice(index,1);
              }
              sender.save();
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

