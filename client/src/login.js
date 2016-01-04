angular.module('pegasys.login',[])
  .controller('LoginController', function($log,$location,$scope,Login,DB,Global) {
    $scope.user = {};
    $scope.welcome = 'Login to Pegasys Ride Sharing';
    $scope.buttonText = 'Login';
    $scope.failure = false;
    $scope.loggedOutUser = Global.getItem('loggedOutUser');
    $scope.logout = Global.getItem('logout');
    $scope.submit = function(){
      DB.postRequest('auth/login',$scope.user).then(
        function(resp){
          if (resp.status === 404){
            $scope.failure = true;
          } else {
            $scope.failure = false;
            Global.setItem('logout', false);
            $location.path('/main');
          };
        });
    };
  });

