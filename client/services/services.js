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

  return {getRequest: getRequest,
          postRequest: postRequest
        };
})
.factory('Main', function(){return true})
.factory('Login',function(){return true})
.factory('About',function(){return true})
.factory('Mapview',function(){return true})
