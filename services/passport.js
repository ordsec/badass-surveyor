const passport = require('passport'),
      GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');

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
    // and getting an access token back. this is our opportunity
    // to save the user in the database
    (accessToken, refreshToken, profile, done) => {
      console.log(`accessToken: ${accessToken}`);
      console.log(`refreshToken: ${refreshToken}`);
      console.log(`profile: ${profile}`);
    }
  )
);
