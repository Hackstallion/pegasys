angular.module('pegasys.match',[])
  .controller('MatchController', function($scope,$http,$log, DB, matchHelpers) {
    $scope.header = 'Your trip matches';
    $scope.user = document.cookie.substr(5);
    $scope.matches = [];

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
          $log.log('matches', $scope.matches);
        })
      });

      // matchHelpers.getMatches(response.data);

    // var getMatches = matchHelpers.getMatches($scope.user).then(function(res){
    //   $log.log('matches', matches);
    //   $scope.matches = res;
    // })
  });
