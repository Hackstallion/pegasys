var UserModel = require('../../database/config.js'),
    Users = UserModel.users,
    Q = require('q');


module.exports = {
  signout: function (req, res, next) {
    var username = req.cookies.user,
        findUser = Q.nbind(Users.findOne, Users);

    findUser({username: username})
      .then(function (user) {
        res.clearCookie('user');
        res.sendStatus(200);
      })
      .fail(function (error) {
        next(error);
        res.sendStatus(400);
      });
  }
}

