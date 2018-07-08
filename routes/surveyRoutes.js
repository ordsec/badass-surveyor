const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

// use this instead of requiring the model in order to avoid
// testing issues
const Survey = mongoose.model('surveys');

module.exports = (app) => {
  // this route handler takes care of a few things:
  // 0. checking if the user is logged in and has credits via
  //    our custom middleware
  // 1. creating a Survey object with data submitted by the user
  // 2. sending the email to all of the recipients added by the user
  // 3. persisting the survey object in the database
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const newSurvey = new Survey({
      title,
      subject,
      body,
      // recipients will come in as one comma-separated string.
      // split it at commas and turn each element into an object.
      // as a result, it will be an array of Recipient instances
      // as prescribed by the Survey schema
      recipients: recipients.split(',').map((email) => {
        return { email: email.trim() };
      }),
      // this must be the ID of the current user and not just the
      // user object
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};
