angular.module('pegasys.signout',[])
  .controller('SignoutController', function($log,$location,$scope,Global,DB) {
    $scope.loggedOutUser = document.cookie.substr(5);
    $scope.submit = function(){
      $log.log('trying to log out');
      Global.setItem('loggedOutUser', $scope.loggedOutUser);
      Global.setItem('logout', true);
      DB.getRequest('auth/signout').then(
        function(resp){
          if (resp.status === 400){
            $scope.success = 'Sorry, you were never logged in.';
          } else {
            $location.path('/login');
          };
        });
    };
    $scope.submit();
  });
