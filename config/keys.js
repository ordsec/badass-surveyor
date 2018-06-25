// manage dev/prod keys here

if (process.env.NODE_ENV === 'production') {
  // spit out prod keys
  module.exports = require('./prod');
} else {
  // dev keys it is!
  module.exports = require('./dev');
}
