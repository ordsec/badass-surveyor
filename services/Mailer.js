// I DON'T KNOW WHAT'S GOING ON UGH

const sendgrid = require('sendgrid'),
      helper = sendgrid.mail;

const keys = require('../config/keys');

// mailer configuration is written in ES6
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('noreply@badass-surveyor.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // built-in method from the helper.Mail class
    // we're supposed to call in Mailer constructor
    this.addContent(this.body);
    // enable click tracking for yes/no responses
    this.addClickTracking();
    // the list of recipients needs to be registered
    // with the Mailer
    this.addRecipients();
  }

  // for each recipient,
  formatAddresses(recipients) {
    // pull off the email address property
    return recipients.map(({ email }) => {
      // return address as formatted by the Email helper
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach((rcpt) => {
      personalize.addTo(rcpt);
    });
    this.addPersonalization(personalize);
  }

  // handle sending actual emails
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    this.sgApi.API(request);

    return response;
  }
}

module.exports = Mailer;
