const mongoose = require('mongoose'),
      { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [String], // array containing some strings
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  }
});

mongoose.model('surveys', surveySchema);
