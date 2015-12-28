angular.module('pegasys.main',[])
  .controller('MainController', function($scope, $location, $log, DB, Main) {
    if (!document.cookie.includes('user')) $location.path('/login');
  	// $scope.welcome = 'Pegasys Commute Sharing';
    $scope.welcome = 'Trips';
    $scope.trips = []; // This should eventually be an array of object literals each containing data for a unique trip
    $scope.messageCount = 0;


    $scope.init = function(){
      var userTrip;
      DB.getRequest('profile')
            .then(function(response){
              $log.log(response);
              var user = response.data;
              userTrip = {
                tripName: 'My Trip', // This should later be a user-assigned name
                startPoint: user.startPoint,
                endPoint: user.endPoint
              };
              if(user.driver){
                userTrip.driver = 'driver';
              }else{
                userTrip.driver = 'rider'
              }

              if(user.matched === 0){
                userTrip.matched = 'No Matches for this trip'
              }else{
                userTrip.matched = 'You are matched with ' + user.matched;
              }
              $scope.trips.push(userTrip);
            })
    }

    $scope.init();
  });
