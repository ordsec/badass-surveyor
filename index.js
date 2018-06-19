const express = require('express'),
      app = express();

const mongoose = require('mongoose');

// execute the User model file. this has to be done
// before running any other files that rely on this model
// (e.g. the passport file, which contains the script for
// what to do when a user authenticates)
require('./models/User');

// execute that file, since there's nothing exported from it
require('./services/passport');

// import authRoutes.js and call it immediately with app obj
require('./routes/authRoutes')(app);

const keys = require('./config/keys');

// connect to mlab instance
mongoose.connect(keys.mongoDevDbUri);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}!`);
});
