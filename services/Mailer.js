const sendgrid = require('sendgrid'),
      helper = sendgrid.mail;

const keys = require('../config/keys');

// mailer configuration is written in ES6
class Mailer extends helper.Mail {
  
}
