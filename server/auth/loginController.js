var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');


module.exports = {
  checkUser: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password,
        findUser = Q.nbind(Users.findOne, Users);

    findUser({username: username})
      .then(function (user) {
        if (!user) {
          res.sendStatus(404);
          next(new Error('User does not exist'));
        } else if (user.password === password) {
          //'this.password' is 'undefined'
            res.cookie('user', username);
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
