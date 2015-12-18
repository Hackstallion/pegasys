angular.module('pegasys.mapview',[])
  .controller('MapviewController', function($scope,Mapview) {
    $scope.isDriver = true; //We'll ultimately pull this from the cookie
    $scope.startPointString = '' //This will go to the Google Places API
    $scope.endPointString = '' //This will go to the Google Places API
    $scope.welcome = 'Enter Your Route';
  });
