angular.module('myApp', [
    // 'ngAnimate',
    //'ngCookies',
    // 'ngResource',
    'ngRoute',
    // 'ngSanitize',
    // 'ngTouch',
    'pegasys.services',
    'pegasys.database',
    'pegasys.login',
    'pegasys.signup',
    'pegasys.main',
    'pegasys.mapview',
    'pegasys.match',
    'pegasys.profile',
    'pegasys.mailbox',
    'pegasys.matchHelpers'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupController',
      })
      .when('/mapview', {
        templateUrl: 'views/mapview.html',
        controller: 'MapviewController',
      })
      .when('/match', {
        templateUrl: 'views/match.html',
        controller: 'MatchController',
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController',
      })
      .when('/mailbox', {
        templateUrl: 'views/mailbox.html',
        controller: 'MailboxController',
      })
      .otherwise({
        redirectTo: '/login'
      });
  });

//define the application module
/*var app = require('angular').module('myApp');

/*
when we inject a controller/factory/directive we use the format found below:
    app.factory(), app.directive(), app.controller() etc,.
*/
/*
app.controller('MainController', require('./src/main.js'));
app.controller('AboutController', require('./src/about.js'));
app.controller('LoginController',require('./src/login.js'));
app.controller('MapCtrl',require('./src/mapview.js'));*/

