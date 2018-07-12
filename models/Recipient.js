const mongoose = require('mongoose'),
      { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: {
    type: Boolean,
    default: false
  }
});

// export it instead of registering the model,
// since this will be for subdocuments
module.exports = recipientSchema;
