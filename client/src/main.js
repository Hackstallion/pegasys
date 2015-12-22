angular.module('pegasys.main',[])
  .controller('MainController', function($scope,Main) {
  	$scope.welcome = 'Pegasys Commute Sharing';
  	$scope.buttonText = 'Log In or Sign Up';
  });
