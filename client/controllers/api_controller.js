angular.module('pegasys.database', ['pegasys.services'])

.controller('DBController', function ($scope, $location, DB) {
  $scope.drivers=[];
  $scope.user={};
  // Your code here
  /*
For reference only:
  $scope.link = {};
  $scope.addLink = function(url) {
    Shorten.addLink(url)
      .then(function(response){
        $scope.link = response;
      }).then(function(){
        $location.path('/links')
      });*/
  $scope.postRequest = function(apiRoute,JSONobject,callback){
    DB.postRequest(apiRoute,JSONobject).then(function(response){
      if (response && callback) callback();
    })
  };

  $scope.getRequest = function(apiRoute,callback){
    DB.getRequest(apiRoute).then(function(response){
      if (response && callback) callback();
    });
  };


});
