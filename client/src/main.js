angular.module('pegasys.main',[])
  .controller('MainController', function($scope,Main) {
  	$scope.welcome = 'Welcome to your App!';
  	$scope.buttonText = 'This is your Button';
  });
