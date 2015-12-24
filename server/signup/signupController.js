var UserModel = require('../../database/config.js');
var Q = require('q');

module.exports = {
  signup: function (req, res, next) {
    var username  = req.body.username,
        password  = req.body.password,
        create,
        newUser;

    var findOne = Q.nbind(UserModel.findOne, UserModel);

    // check to see if user already exists
    findOne({username: username})
      .then(function(user) {
        if (user) {
          next(new Error('User already exists!'));
        } else {
          // make a new user if not one
          create = Q.nbind(UserModel.create, UserModel);
          newUser = {
            username: username,
            password: password
          };
          return create(newUser);
        }
      })
      // .then(function (user) {
      //   // create token to send back for auth
      //   var token = jwt.encode(user, 'secret');
      //   res.json({token: token});
      // })
      .fail(function (error) {
        next(error);
      });
  }
}

//Not worrying about tokens or hashed passwords until phase 2 

