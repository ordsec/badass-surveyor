const sendgrid = require('sendgrid'),
      helper = sendgrid.mail;

const keys = require('../config/keys');

// mailer configuration is written in ES6
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.from_email = new helper.Email('noreply@badass-surveyor.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
  }
}

module.exports = Mailer;
