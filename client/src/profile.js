angular.module('pegasys.profile',[])
  .controller('ProfileController', function($scope,$http,Profile,DB) {
    if (!document.cookie.includes('user')) $location.path('/login');
    $scope.header = 'Edit Your Profile';	
    $scope.buttonText = 'Submit Your Changes';
    $scope.saved = '';
    $scope.profile = {};
    DB.getRequest('profile').then(function(result){
      $scope.user = result.data;
    })
    $scope.submit = function(){
      DB.postRequest('profile',$scope.user).then(function(){
        $scope.saved = 'Changes Saved!'
      })
    }
  });
