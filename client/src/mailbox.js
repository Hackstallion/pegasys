angular.module('pegasys.mailbox',[])
  .controller('MailboxController', function($log,$location,$scope,$http,Mailbox,DB) {
    if (!document.cookie.includes('user')) $location.path('/login');
    $scope.user = document.cookie.substring(5);
    $scope.header = 'Mailbox';	
    $scope.messages = [];
    $scope.newMessage = {
      from_id: $scope.user,
      to_id: '',
      text: ''
    };
    var getMessages = function(){
      DB.getRequest('messages/getinbox').then(function(res){
        $scope.messages = res.data.map(function(msg){return JSON.parse(msg);});
      });
    };
    getMessages();
    $scope.delMessage = function(message){
      DB.postRequest('messages/delete', message).then(function(){
        getMessages();
      });
      $log.log('deleted'+message);
    };
    $scope.reply = function(message){
      var messageObj = {
        from_id: $scope.user,
        to_id: message.from_id,
        text: message.replytext
      };
      DB.postRequest('messages/send', messageObj).then(function(){
        getMessages();
      });
    };
    $scope.sendMessage = function(recipient){
      if (!$scope.newMessage.text.length) return;
      if (recipient) $scope.newMessage.to_id = recipient;
      DB.postRequest('messages/send', $scope.newMessage).then(function(){
        $scope.newMessage = {from_id:$scope.user,to_id:'',text:''};
        getMessages();
      });
    };
  });
