const weather = require('openweather-apis');


const getWeather = (req, res) => {
  weather.setZipCode(14586);
  weather.setLang('en');
  weather.setUnits('imperial');
  weather.setAPPID('bb74f5bb942c1abe061a42399df3addb');// key from site
  weather.getAllWeather((err, JSONObj) => {
    if (err) {
      console.log(err);
      return res.status(503);// service unavailable
    }
    console.log(JSONObj);
    return res.status(200).json(JSONObj);
  });
  return res.status(503);
};
//requires paid plan
const getForcast = (req, res) => {
  weather.setZipCode(14586);
  weather.setLang('en');
  weather.setUnits('imperial');
  weather.setAPPID('bb74f5bb942c1abe061a42399df3addb');// key from site
  weather.getWeatherForecastForDays(3, (err, obj) => {
    if (err) {
      return res.status(503);
    }
    console.log(obj);
    return res.json(obj);
  });
};

/*
// get a simple JSON Object with temperature, humidity, pressure and description
weather.getSmartJSON(function(smart){
    console.log(smart);
});
*/

module.exports.getWeather = getWeather;
module.exports.getForcast = getForcast;
