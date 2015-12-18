angular.module('pegasys.login',[])
  .controller('LoginController', function($scope,Login) {
    $scope.welcome = 'User Login';
    $scope.buttonText = 'Login';
  });
