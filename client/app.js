angular.module('myApp', [
    // 'ngAnimate',
    //'ngCookies',
    // 'ngResource',
    'ngRoute',
    // 'ngSanitize',
    // 'ngTouch',
    'pegasys.services',
    'pegasys.database',
    'pegasys.about',
    'pegasys.login',
    'pegasys.main',
    'pegasys.mapview',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController',
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
      })
      .when('/mapview', {
        templateUrl: 'views/mapview.html',
        controller: 'MapController',
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

