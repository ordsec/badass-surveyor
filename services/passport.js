const passport = require('passport'),
      GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');

const keys = require('../config/keys');

// this FETCHES the User model. a second argument (the schema)
// would be required to put something into the DB
const User = mongoose.model('users');

// put a user's id into a cookie for further recognition.
// this takes the user id from our Mongo database,
// NOT the google profile id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// take the cookie (the user id) and fetch the profile
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user));
});

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
      User.findOne({ googleID: profile.id })
        .then((existing) => {
          if (existing) {
            done(null, existing);
          } else {
            const newUser = new User({
              googleID: profile.id
            });
            newUser.save()
              .then(user => done(null, user));
          }
        })
        .catch(e => console.log(e));
    }
  )
);
