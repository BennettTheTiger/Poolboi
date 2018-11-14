const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/about', (req, res) => { res.render('about'); });
  app.get('/dashboard', mid.requiresSecure, mid.requiresLogin, (req, res) => { res.render('app'); });
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/weather', controllers.Weather.getWeather);
  app.get('/forcast', controllers.Weather.getForcast);
  app.get('/accountInfo', mid.requiresSecure, mid.requiresLogin, controllers.Account.getBasic);
  app.get('/newWaterBody', mid.requiresSecure, mid.requiresLogin, (req, res) => { res.render('newBody'); });
  app.post('/addWaterBody', mid.requiresLogin, mid.requiresSecure, controllers.WaterBody.makeBody);
  app.get('/addWater', (req, res) => { res.render('addWater'); });
};

module.exports = router;
