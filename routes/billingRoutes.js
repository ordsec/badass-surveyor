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
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    console.log(charge);
  });
};
