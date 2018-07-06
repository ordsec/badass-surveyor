const mongoose = require('mongoose'),
      { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [String] // array containing some strings
});

mongoose.model('surveys', surveySchema);
