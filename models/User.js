const mongoose = require('mongoose');

// destructure the Schema property off of the
// mongoose object
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String
});

mongoose.model('users', userSchema);
