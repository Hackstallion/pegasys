angular.module('pegasys.services', [])

.factory('DB', function ($http, $location, $window) {

  var postRequest = function(apiRoute,JSONobject){
    return $http({
      method: 'POST',
      url: '/api/'+apiRoute,
      data: JSONobject
    }).then(function (resp){
      return resp;
    });
  }

  var getRequest = function(apiRoute){
    return $http({
      method: 'GET',
      url: '/api/'+apiRoute,
    }).then(function(resp){
      return resp;
    })
  };

  return {getRequest,
          postRequest
        };
})

.factory('Auth', function ($http, $location, $window) {


  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
