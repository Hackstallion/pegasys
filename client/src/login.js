angular.module('pegasys.login',[])
  .controller('LoginController', function($log,$location,$scope,Login,DB) {
    $scope.user = {};
    $scope.welcome = 'Login to Pegasys Ride Sharing';
    $scope.buttonText = 'Login';
    $scope.submit = function(){
      DB.postRequest('auth/login',$scope.user).then(
        function(){
          $log.log('submitted');
          $location.path('/mapview');
        });
    };
  });
