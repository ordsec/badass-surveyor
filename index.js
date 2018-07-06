const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      cookieSession = require('cookie-session'),
      passport = require('passport'),
      bodyParser = require('body-parser');

const keys = require('./config/keys');

app.use(bodyParser.json());

// plug the cookie-session lib to make express use cookies
app.use(cookieSession({
  // how long the cookie lasts in the browser until it expires,
  // 30 days in this case, expressed in milliseconds :-D
  maxAge: 30 * 24 * 60 * 60 * 1000,
  // secret to sign the cookie. can be multiple - hence the array
  keys: [keys.cookieKey]
}));

// activate passport for the app, with session support
app.use(passport.initialize());
app.use(passport.session());

// execute all model files. this has to be done
// before running any other files that rely on this model
// (e.g. the passport file, which contains the script for
// what to do when a user authenticates)
require('./models/User');
require('./models/Survey');

// execute that file, since there's nothing exported from it
require('./services/passport');

// import routes and call the imported functions immediately
// with the `app` object we got back from `express()`
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// connect to mlab instance
mongoose.connect(keys.mongoDbUri);

if (process.env.NODE_ENV === 'production') {
  // serve up production assets (main.js or main.css)
  app.use(express.static('client/build'));

  // serve up index.html if route is not recognized
  // (it might be a react-router route)
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}!`);
});
