var browserify = require('browserify-middleware')
var db = require('../database/config.js')
var express = require('express');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var app = express();

var users = [];
var userId = 1;

app.post('/api/*',cookieparser(),bodyparser.json(),function(req,res){
  var endpoint = req.url.substring(5);
  switch (endpoint) {
    case 'signup':
      if (users.some(function(storedUser){
        return storedUser.username === req.body.username;
      })) {
        res.status(400);
        res.end('User Already Exists.');
      } else {
        var newUser = req.body;
        newUser.id = userId;
        userId++;
        newUser.driver = newUser.driver || false;
        newUser.mailbox = [];
        newUser.matched = 0;
        users.push(newUser);
        res.status(201);
        res.end('User Created');
      }
      break;
    case 'login':
      var user = users.filter(function(storedUser){
        return storedUser.username === req.body.username;
      })
      if (!user[0] || user[0].password !== req.body.password){
        res.status(401);
        res.end('Bad Password or Username');
      } else {
        res.status(200);
        res.append('Set-Cookie','username='+req.body.username);
        res.end('Logged In Successfully');
      }
      break;
    case 'endpoints':
      console.log(req.cookie);
      break;
    case 'route':
      //should validate cookie
      break;
    case 'profile':
      //should validate cookie
      break;
    case 'message':
      //should validate cookie
      break;
    case 'match':
      //should validate cookie
      break;
    default:
      res.status(500);
      res.end('Bad Request. Probably Daniel\'s fault');
      break;
  }
})
app.get('/api/*',cookieparser(),bodyparser.json(),function(req,res){
  var endpoint = req.url.substring(5);
  switch (endpoint){
    case 'switch':
      break;
    case 'profile':
      break;
    case 'drivers':
      res.status(200);
      var drivers = users.filter(function(user){
        return user.driver && !user.matched;
      })
      res.json(drivers);
      break;
    default:
      res.status(500);
      res.end('Bad Request. Probably Daniel\'s fault');
      break;
  }

});
//route to your index.html
app.use(express.static('client/'));

//browersify which injects all dependencies into index.html
var shared = ['angular'];
app.get('/js/vendor-bundle.js', browserify(shared));
app.get('/js/app-bundle.js', browserify('./client/app.js', { external: shared }));


var port = process.env.PORT || 4000;

app.listen(port);
console.log("Listening on port", port);

//REFACTOR BASED ON SOLUTION CODE TO HANDLE REQUESTS AND SET VARIABLES FOR $SCOPE
// app.get('/Users', function(req, res) {
//     mongoose.model('Users').find(function(err, users) {
//         if (err) {
//             res.send(err);
//         }
//         res.send(users);
//     });
// });

// app.post('/Users', function(req, res) {
//     mongoose.model('Users').create({
//         driver: req.body.driver,

//     }, function(err, users) {
//         if (err) {
//             res.send(err);
//         }
//         res.send(users);
//     })
// })
