
 var mongoose = require('mongoose');


// if (!process.env.PORT) {mongoose.connect('mongodb://localhost:27017')}
mongoose.connect('mongodb://hackstallion:hackstallion@ds043082.mongolab.com:43082/pegasys-ride-share')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("Connected to MongoDB");
});

var usersSchema = mongoose.Schema({
    driver: { type: Boolean, default: false },
    matched: { type: Number, default: 0 },
    username: String,
    password: String,
    startPoint: Array,
    endPoint: Array,
    route: Array,
    bounds: Array,
    matchRequests: Array,
    startTime: Number,
    endTime: Number,
    inbox: Array,
    sent: Array
  });

var Users = mongoose.model('Users',usersSchema);

// Users.collection.insert ({"sample3": "test3"});

//BOTH MODEL AND CONNECTION NEED TO BE EXPORTED TO SERVER
module.exports.users = Users;
module.exports.db = db;
