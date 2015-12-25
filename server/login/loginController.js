
var UserModel = require('../../database/config.js');

module.exports = {
  checkUser: function (req, res, next) {
    UserModel.users.find(function(err, user) {
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

