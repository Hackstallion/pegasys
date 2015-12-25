var UserModel = require('../../database/config.js');
var Users = UserModel.users;
var Q = require('q');


module.exports = {
  checkUser: function (req, res, next) {
    Users.find(function(err, user) {
      console.log('req.body', req.body)
      if(req.body.username === user.username && req.body.password === user.password) {
        res.send(200)
      } else {
        return next(new Error('No such user in our database'));
        }
    })
    next();
  }
}

//Not worrying about tokens or hashed passwords until phase 2 
