

var bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser');


module.exports = function (app, express) {
  var authRouter = express.Router(),
      tripRouter = express.Router(),
      usersRouter = express.Router(),
      profileRouter = express.Router(),
      matchRouter = express.Router(),
      messageRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.static(__dirname + '/../client'));

  app.use('/api/auth', authRouter);
  app.use('/api/createtrip', tripRouter);
  app.use('/api/getusers', usersRouter);
  app.use('/api/profile', profileRouter);
  app.use('/api/matches', matchRouter);
  app.use('/api/messages', messageRouter);


  require('./auth/authRoutes.js')(authRouter);
  require('./locations/locationsRoutes.js')(tripRouter);
  require('./users/usersRoutes.js')(usersRouter);
  require('./profile/profileRoutes.js')(profileRouter);
  require('./matches/matchRoutes.js')(matchRouter);
  require('./messages/messageRoutes.js')(messageRouter);
};






