const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // core
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/about', (req, res) => { res.render('about'); });
  app.get('/dashboard', mid.requiresSecure, mid.requiresLogin, (req, res) => { res.render('app'); });
  // Login routes
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/accountInfo', mid.requiresSecure, mid.requiresLogin, controllers.Account.getBasic);
  // Password
  app.get('/newPassword', mid.requiresLogin, mid.requiresSecure, (req, res) => { res.render('password'); });
  app.post('/updatePass', mid.requiresLogin, mid.requiresSecure, controllers.Account.updatePassword);
  // weather
  app.get('/weather', controllers.Weather.getWeather);
  app.get('/forcast', controllers.Weather.getForcast);
  // water body
  app.get('/newWaterBody', mid.requiresSecure, mid.requiresLogin, (req, res) => { res.render('newBody'); });
  app.post('/addWaterBody', mid.requiresLogin, mid.requiresSecure, controllers.WaterBody.makeBody);
  app.get('/waterBodies', mid.requiresLogin, mid.requiresSecure, controllers.WaterBody.getBodies);
  // water samples
  app.get('/newWaterTest', mid.requiresSecure, mid.requiresLogin, (req, res) => { res.render('addWater'); });
  app.post('/addWater', mid.requiresLogin, mid.requiresSecure, controllers.WaterSample.makeSample);
  app.get('/addWater', mid.requiresLogin, mid.requiresSecure, controllers.WaterSample.getSamples);
  // error handling
  app.get('/error', (req, res) => { res.render('error', { msg: req.body }); });
  app.get('*', (req, res) => { res.render('error', { msg: 'The page you are looking was not found' }); });
};

module.exports = router;
