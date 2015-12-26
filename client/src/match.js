angular.module('pegasys.match',[])
  .controller('MatchController', function($scope,$http,$log,matchHelpers) {
    $scope.header = 'I am ready to be built!';
    $scope.user = document.cookie.user;
    $scope.matches = [];

    DB.getRequest('profile').then(function(result){
      $scope.user = result.data;
      getMatches().then($log.log('successful match getting'));
    })

    var getMatches = matchHelpers.getMatches($scope.user).then(function(res){
      $log.log('matches', matches);
      $scope.matches = res;
    })
  });
