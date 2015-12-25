var messageController = require('./messageController.js');

module.exports = function (app) {

  app.get('/getInbox', messageController.showInbox);
  app.get('/getSent', messageController.showSent);
  app.put('/send', messageController.sendMessage);
}
