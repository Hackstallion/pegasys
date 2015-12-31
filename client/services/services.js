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
.factory('Trip',function(){
  var data = {};
  var setItem = function(name,item){
    data[name] = item;
  }
  var getItem = function(name){
    return data[name];
  }
  return {setItem: setItem,
          getItem: getItem}
})
.factory('Main', function(){return true})
.factory('Login',function(){return true})
.factory('Signup',function(){return true})
.factory('Match',function(){return true})
.factory('Profile',function(){return true})
.factory('Mailbox',function(){return true})
.factory('Mapview',function($http,$location,$window){return true})
