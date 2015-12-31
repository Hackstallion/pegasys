
var mongoose = require('mongoose');
var Q = require('q');

// if (!process.env.PORT) {mongoose.connect('mongodb://localhost:27017')}
mongoose.connect('mongodb://hackstallion:hackstallion@ds043082.mongolab.com:43082/pegasys-ride-share')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("Connected to MongoDB");
});

var usersSchema = mongoose.Schema({
    matchRequests: Array,
    username: String,
    password: String,
    trips: { type: String, default: '{}' },
    startTime: { type: Number, default: 0 },
    endTime: { type: Number, default: 0 },
    inbox: Array,
    sent: Array
  });

var Users = mongoose.model('Users',usersSchema);

// Users.collection.insert ({"sample3": "test3"});

//MODEL AND CONNECTION NEED TO BE EXPORTED TO CONTROLLERS AND SERVER, RESPECTIVELY
module.exports.users = Users;
module.exports.db = db;

// See http://stackoverflow.com/questions/23692996/how-could-i-bind-save-method-using-q-with-mongoose
Users.save = Q.nbind(Users.save, Users);


