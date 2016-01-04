angular.module('pegasys.mailbox',[])
  .controller('MailboxController', function($log,$location,$scope,$http,Mailbox,DB) {
    if (!document.cookie.includes('user')) $location.path('/login');
    $scope.user = document.cookie.substring(5);
    //get the current user from the cookie, redirect them if there's no cookie
    $scope.header = 'Mailbox';	
    $scope.messages = [];
    $scope.newMessage = {
      from_id: $scope.user,
      to_id: '',
      text: ''
    };
    var getMessages = function(){
      //get all of the user's messages
      DB.getRequest('messages/getinbox').then(function(res){
        $scope.messages = res.data.map(function(msg){return JSON.parse(msg);});
      });
    };
    getMessages();
    $scope.delMessage = function(message){
      //deletes a single message. Takes the whole message as its parameter.
      DB.postRequest('messages/delete', message).then(function(){
        getMessages();
      });
      $log.log('deleted'+message);
    };
    $scope.reply = function(message){
      //quietly do nothing if there's no message text.
      if (!message.replytext.length) return;
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
      //quietly do nothing if there's no message text.
      if (!$scope.newMessage.text.length) return;
      if (recipient) $scope.newMessage.to_id = recipient;
      DB.postRequest('messages/send', $scope.newMessage).then(function(){
        getMessages();
      });
    };
  });
