angular.module('pegasys.match',[])
  .controller('MatchController', function($scope,$http,$log, DB, matchHelpers) {
    $scope.header = 'Your trip matches';
    $scope.user = document.cookie.substr(5);
    $scope.matches = [];

    $log.log('about to do DB request');

    DB.getRequest('profile').then(function(result){
      $scope.user = result.data;
      matchHelpers.getMatches().then($log.log('successful match getting'));
    });

    var getMatches = matchHelpers.getMatches($scope.user).then(function(res){
      $log.log('matches', matches);
      $scope.matches = res;
    })
  });
