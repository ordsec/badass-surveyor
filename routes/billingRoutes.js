const keys = require('../config/keys');

const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {

  // create new charge based on the token that
  // comes back from the stripe API after payment
  // is submitted on the client side. the token
  // is in req.body.id. the `stripe.charges.create`
  // call is asynchronous. once the `charge` object
  // is received, the user has been billed.
  app.post('/api/stripe', async (req, res) => {
    if (!req.user) {
      return res.status(401).send({
        error: 'You must be logged in to perform this action.'
      });
    }

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    // the current user is already available on the
    // req object, so we can easily access it
    req.user.credits += 5;

    const user = await req.user.save();

    res.send(user);
  });
};
