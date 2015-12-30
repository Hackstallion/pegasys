angular.module('pegasys.main',[])
  .controller('MainController', function($scope, $location, $log, DB, Main) {
    if (!document.cookie.includes('user')) $location.path('/login');
  	// $scope.welcome = 'Pegasys Commute Sharing';
    $scope.welcome = 'Trips';
    $scope.trips = [];
    $scope.messageCount = 0;


    $scope.init = function(){
      var userTrip;
      DB.getRequest('profile')
            .then(function(response){
              $log.log(response);
              var user = response.data;
              var trips = JSON.parse(user.trips);
              for(trip in trips){
                var currTrip = trips[trip];
                userTrip = {
                  tripName: trip,
                  startPoint: currTrip.startPoint,
                  endPoint: currTrip.endPoint
                };
                if(currTrip.driver){
                  userTrip.driver = 'driver';
                }else{
                  userTrip.driver = 'rider'
                }

                if(currTrip.matched === [] || !currTrip.matched){
                  var optionType = 'driver';
                  if(currTrip.driver){
                    optionType = 'rider';
                  }
                  userTrip.matched = 'You do not have a ' + optionType + ' for this trip'
                }else{
                  $log.log(currTrip.matched);
                  userTrip.matched = '';
                  for(var i = 0; i < currTrip.matched.length; i++){
                    userTrip.matched += userTrip.matched = 'Your ' + optionType + ' for this trip is ' + currTrip.matched + '\n';
                  }
                }
                $scope.trips.push(userTrip);
              }
            })
    }

    $scope.getMatches = function(tripName){
      window.tripName = tripName;
      $location.path('/match');
    }

    $scope.init();
  });
