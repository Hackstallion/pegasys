angular.module('myApp', [
    // 'ngAnimate',
    //'ngCookies',
    // 'ngResource',
    'ngRoute',
    // 'ngSanitize',
    // 'ngTouch',
    'pegasys.services',
    'pegasys.login',
    'pegasys.signup',
    'pegasys.main',
    'pegasys.mapview',
    'pegasys.match',
    'pegasys.profile',
    'pegasys.mailbox',
    'pegasys.signout',
    'pegasys.matchHelpers'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html'
      })
      .when('/main', {
        templateUrl: 'views/main.html'
      })
      .when('/mapview', {
        templateUrl: 'views/mapview.html'
      })
      .when('/match', {
        templateUrl: 'views/match.html'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html'
      })
      .when('/mailbox', {
        templateUrl: 'views/mailbox.html'
      })
      .when('/signout', {
        templateUrl: 'views/signout.html'
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

