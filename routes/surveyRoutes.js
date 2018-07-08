const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

// use this instead of requiring the model in order to avoid
// testing issues
const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const newSurvey = new Survey({
      title,
      subject,
      body,
      // recipients will come in as one comma-separated string.
      // split it at commas and turn each element into an object
      recipients: recipients.split(',').map((email) => ({ email })),
      // this must be the ID of the current user and not just the
      // user object
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};
