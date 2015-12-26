var UserModel = require('../../database/config.js');
var Users = UserModel.users;
var Q = require('q');


module.exports = {
  checkUser: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password,
        findUser = Q.nbind(Users.findOne, Users);

    findUser({username: username})
      .then(function (user) {
        if (!user) {
          // use this line if we want users who've not signed up before to just be signed up on this login attempt; strangely, it creates 2 entries...
          // res.redirect(307, '../signup/signup');
          res.sendStatus(404);
          next(new Error('User does not exist'));
        } else if (user.password === password) {
          //'this.password' is 'undefined'
            user.loggedIn = true;
            user.save();
            res.sendStatus(200);
        } else {
            return next(new Error('Incorrect Password'));
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
}
//Not worrying about tokens or hashed passwords until phase 2 
