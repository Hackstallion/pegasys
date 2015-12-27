angular.module('pegasys.match',[])
  .controller('MatchController', function($scope,$http,$log, DB, matchHelpers) {
    $scope.header = 'Your trip matches';
    $scope.user = document.cookie.substr(5);
    $scope.matches = [];
    $scope.matchNames = [];

    $log.log('about to do DB request');

    var userData;
    var usersData;
    DB.getRequest('profile')
      .then(function(response){
        $log.log('profile request result', response);
        userData = response.data;
        DB.getRequest('getusers', userData.username).then(function(response){
          usersData = response.data;
          $log.log('userData', userData);
          $log.log('usersData', usersData);
          $scope.matches = matchHelpers.getMatches(userData, usersData);
          for(var i = 0; i < $scope.matches.length; i++){
            $scope.matchNames.push($scope.matches[i].username);
          }
          $log.log('matches', $scope.matches);
          $log.log('matchNames', $scope.matchNames);
        })
      });

      // matchHelpers.getMatches(response.data);

    // var getMatches = matchHelpers.getMatches($scope.user).then(function(res){
    //   $log.log('matches', matches);
    //   $scope.matches = res;
    // })
  });
