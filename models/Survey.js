const mongoose = require('mongoose'),
      { Schema } = mongoose;

const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // array containing RecipientSchema subdocument instances
  recipients: [RecipientSchema],
  // count yes/no responses
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  },
  // every Survey belongs to a particular User.
  // the underscore is not required, but is used by convention
  // to indicate a reference field
  _user: {
    // this will be the ID of the user who owns the record
    type: Schema.Types.ObjectId,
    // reference to the 'users' collection
    ref: 'User'
  },
  // when the survey was sent
  dateSent: Date,
  // when the last response was received
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);
