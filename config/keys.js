// manage dev/prod keys here

if (process.env.node_env === 'production') {
  // spit out prod keys
  
} else {
  // dev keys it is!
  module.exports = require('./dev');
}
