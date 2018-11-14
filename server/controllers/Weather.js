const DarkSky = require('dark-sky');
const darksky = new DarkSky('ddfb1e792565eb08bade7f7efed78aa9');
// Your API KEY can be hardcoded, set it as an env variable. process.env.DARK_SKY
const zipcode = require('zipcodes');

// gets the current weather for a zipcode
const getWeather = (req, res) => {
  const location = zipcode.lookup(14589);
  darksky
    .options({
      latitude: location.latitude,
      longitude: location.longitude,
      language: 'en',
      exclude: ['minutely', 'daily'],
    })
    .exclude('minutely,hourly,daily,alerts,flags')
    .get()
    .then((data) => res.json(data));
};

const getForcast = (req, res) => {
  const location = zipcode.lookup(14589);
  darksky
    .options({
      latitude: location.latitude,
      longitude: location.longitude,
      language: 'en',
    })
    .exclude('minutely,hourly,alerts,flags')
    .get()
    .then((data) => res.json(data));
};


module.exports.getWeather = getWeather;
module.exports.getForcast = getForcast;
