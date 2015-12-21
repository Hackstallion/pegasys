var browserify = require('browserify-middleware')
var db = require('../database/config.js')
var express = require('express');
var bodyparser = require('body-parser');
var app = express();

app.post('/api/endpoints',bodyparser.json(),function(req,res){
  console.log(req.body);
  res.status(201);
  res.end();
});

app.post('/api/route',bodyparser.json(),function(req,res){
  console.log(req.body);
  res.status(201);
  res.end();
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
