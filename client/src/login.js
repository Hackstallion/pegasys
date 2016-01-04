angular.module('pegasys.login',[])
  .controller('LoginController', function($log,$location,$scope,Login,DB) {
    $scope.user = {};
    $scope.welcome = 'Login to Pegasys Ride Sharing';
    $scope.buttonText = 'Login';
    $scope.success = '';
    $scope.submit = function(){
      DB.postRequest('auth/login',$scope.user).then(
        function(resp){
          if (resp.status === 404){
            $scope.success = 'Sorry, your username or password is incorrect.';
          } else {
            $location.path('/main');
          };
        });
    };
  });
