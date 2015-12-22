var Login = require('../databse/config.js');

module.exports = {
  checkUser = function (req, res, next) {
    Login.users.find(function(err, user) {
      console.log('req.body', req.body)
      if(req.body.username === user.username && req.body.password === user.password) {
        res.send(200)
      }
    })
    next();
  }
}

//Not worrying about tokens or hashed passwords until phase 2 