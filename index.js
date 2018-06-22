const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      cookieSession = require('cookie-session'),
      passport = require('passport');

const keys = require('./config/keys');

// plug the cookie-session lib to make express use cookies
app.use(cookieSession({
  // how long the cookie lasts in the browser until it expires,
  // in milliseconds :-D
  maxAge: 30 * 24 * 60 * 60 * 1000,
  // secret to sign the cookie. can be multiple - hence the array
  keys: [keys.cookieKey]
}));

// activate passport for the app, with session support
app.use(passport.initialize());
app.use(passport.session());

// execute the User model file. this has to be done
// before running any other files that rely on this model
// (e.g. the passport file, which contains the script for
// what to do when a user authenticates)
require('./models/User');

// execute that file, since there's nothing exported from it
require('./services/passport');

// import authRoutes.js and call it immediately with app obj
require('./routes/authRoutes')(app);

// connect to mlab instance
mongoose.connect(keys.mongoDevDbUri);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}!`);
});
