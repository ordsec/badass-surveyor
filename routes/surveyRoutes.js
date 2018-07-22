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
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send({
      message: 'Your feedback is SO important to us.'
    });
  });
  
  // receive click data from sendgrid to show survey stats
  // on the client side, update the stats in our DB.
  // there is no need for any async action in this one,
  // since sendgrid doesn't care about the response
  // it'll receive, or even if there is a response.
  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) return {
          email,
          surveyId: match.surveyId,
          choice: match.choice
        };
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        // query to find a survey to update:
        // we need a survey with the given ID,
        // and whose recipients contain one
        // with the given email; this recipient
        // shouldn't have responded yet.
        // update the record immediately
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            // find the appropriate subdoc
            $elemMatch: {
              email, responded: false
            }
          }
        }, {
          // $inc is a mongo operator: find the
          // `choice` property and increment it
          // by one (that's what the `inc` is for).
          // we abstract the value of `choice`
          // by using key interpolation, so that
          // whatever it is ('yes' or 'no'), it
          // will be incremented
          $inc: { [choice]: 1 },
          // update one of the properties of the
          // Survey instance we're working with.
          // in this case, we're looking at a subdoc,
          // so we are looking at the `recipients`,
          // taking the one recipient we need (the $
          // lines up with `$elemMatch` from above),
          // and updating its `responded` property
          // to true
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec();
      })
      .value();

    res.send({ message: 'ok cool thx' });
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
