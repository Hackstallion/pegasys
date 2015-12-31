var messageController = require('./messageController.js');

module.exports = function (app) {

  app.get('/getinbox', messageController.showInbox);
  app.get('/getsent', messageController.showSent);
  app.post('/send', messageController.sendMessage);
  app.post('/delete', messageController.delMessage)
}
