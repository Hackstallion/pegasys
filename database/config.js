
var mongoose = require('mongoose');
if (!process.env.PORT) {mongoose.connect('mongodb://localhost:27017/Users')}
else mongoose.connect('mongodb://someMadeupURL')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("Connected to MongoDB");
});

var usersSchema = mongoose.Schema({
    driver: { type: Boolean, default: false },
    matched: { type: int, default: 0 },
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

/******* FROM VIDEO TUTORIAL ********/

//good to have the following in a routes file
app.get('/Users', function(req, res) {
    mongoose.model('Users').find(function(err, users) {
        if (err) {
            res.send(err);
        }
        res.send(users);
    });
});

app.post('/Users', function(req, res) {
    mongoose.model('Users').create({
        driver: req.body.driver,

    }, function(err, users) {
        if (err) {
            res.send(err);
        }
        res.send(users);
    })
})

