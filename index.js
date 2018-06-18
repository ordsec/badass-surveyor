const express = require('express'),
  app = express();

const passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');

// new instance of the google passport strategy -
// we're about to authenticate users with google oauth.
// when creating a new strategy, pass it the clientID
// and the secret from google API site
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // route the user is sent to after granting permission
      callbackURL: '/auth/google/callback'
    },
    // this callback function describes what we will do
    // upon successfully authenticating the user through google
    // and getting an access token back.
    accessToken => {
      console.log(accessToken);
    }
  )
);

// route for where the user is gonna be directed
// to start the authentication process
app.get(
  '/auth/google',
  // instead of the arrow function with req/res,
  // we call on the passport object with the `authenticate`
  // method. the 'google' string we pass to it doesn't
  // have much to do with the above configuration for the
  // google strategy. the google strategy is registered with
  // passport, so whenever the `authenticate` method is called
  // with 'google', passport will know what strategy we're using
  passport.authenticate('google', {
    // the scope specifies to google what access we're requesting
    // from the google API - in this case, the user's profile
    // and email data. all these strings are very specific and
    // must be used with passport and google!
    scope: ['profile', 'email']
  })
);

// this one handles sending a follow-up request to google after
// user grants permission for app to access their data and google
// kicks the user back to our app. this follow-up is the 'callback' -
// passport exchanges the code with google for information about
// the user.
app.get(
  '/auth/google/callback',
  // in return for this, we receive an access token - the one
  // that
  passport.authenticate('google')
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}!`);
});
