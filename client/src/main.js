angular.module('pegasys.main',[])
  .controller('MainController', function($scope,Main) {
  	$scope.welcome = 'Pegasys Commute Sharing';
  	$scope.signupButtonText = 'Sign Up';
    $scope.loginButtonText = 'Log In';
  });
