angular.module('pegasys.match',[])
  .controller('MatchController', function($scope, $log, DB, matchHelpers) {
    $scope.header = 'My Matches';
    $scope.user = document.cookie.substr(5);
    $scope.matches = [];
    $scope.matchNames = [];

    $scope.tester = function(){$log.log('testing testing')};

    $scope.requestMatch = function(requestedUsername){
        DB.postRequest('matches/request', {from_id: $scope.user, to_id: requestedUsername})
          .then(function(){$log.log('sent match request')});
    };

    $scope.getMatches = function(){
      var userData;
      var usersData;
      DB.getRequest('profile')
        .then(function(response){
          userData = response.data;
          DB.getRequest('getusers', userData.username).then(function(response){
            usersData = response.data;
            $scope.matches = matchHelpers.getMatches(userData, usersData);
            for(var i = 0; i < $scope.matches.length; i++){
              $scope.matchNames.push($scope.matches[i].username);
            }
          })
        });
    };
    
    // Runs getMatches upon page load
    $scope.getMatches();

  });
