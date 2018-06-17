const express = require('express'),
  app = express();

const passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy;

// new instance of the google passport strategy -
// we're about to authenticate users with google oauth.
passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}!`);
});
