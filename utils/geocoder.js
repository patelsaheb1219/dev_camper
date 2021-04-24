const NodeGeocoder = require("node-geocoder");

console.log('key', process.env.GEOCODER_API_KEY, process.env.GEOCODER_PROVIDER);
const options = {
  provider: process.env.GEOCODER_PROVIDER || 'mapquest',
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY || 'FEZ5ZMA31GvLQpG1zfmxhqlWhZAnHGkB',
  formatter: null
};


const geocoder = NodeGeocoder(options);

module.exports = geocoder;