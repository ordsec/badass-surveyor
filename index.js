const express = require('express'),
      app = express();

const mongoose = require('mongoose');

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
