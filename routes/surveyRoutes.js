const mongoose = require('mongoose'),
      _ = require('lodash'),
      Path = require('path-parser').default,
      { URL } = require('url');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

// use this instead of requiring the model in order to avoid
// testing issues
const Survey = mongoose.model('surveys');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = (app) => {
  // receive click data from sendgrid to show survey stats
  // on the client side
  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    const events = _.map(req.body, ({ email, url }) => {
      const match = p.test(new URL(url).pathname);
      if (match) return {
        email,
        surveyId: match.surveyId,
        choice: match.choice
      };
    });

    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

    console.log(uniqueEvents);

    res.send({ message: 'ok cool thx' });
  });

  app.get('/api/surveys/yourock', (req, res) => {
    res.send({
      message: 'Your feedback is SO important to us! :D'
    });
  });

  // this route handler takes care of a few things:
  // 0. checking if the user is logged in and has credits via
  //    our custom middleware
  // 1. creating a Survey object with data submitted by the user
  // 2. sending the email to all of the recipients added by the user
  // 3. persisting the survey object in the database
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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

    // handle sending emails
    const mailer = new Mailer(newSurvey, surveyTemplate(newSurvey));

    try {
      await mailer.send();

      // save the survey (no return value, so no need to assign the
      // await to a variable)
      await newSurvey.save();

      // deduct one credit
      req.user.credits -= 1;

      // persist the updated user and save to a variable to send it back
      const user = await req.user.save();
      res.send(user);
    } catch (e) {
      res.status(422).send(e);
    }
  });
};
