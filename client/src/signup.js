angular.module('pegasys.signup',[])
  .controller('SignupController', function($log,$location,$scope,Signup,DB) {
    $scope.user = {driver:false};
    $scope.welcome = 'Sign up for Pegasys Ride Sharing';
    $scope.buttonText = 'Create New User';
    $scope.submit = function(){
      DB.postRequest('auth/signup',$scope.user).then(
        function(){
          $log.log('submitted');
          $location.path('/mapview');
        });
    };
  });
