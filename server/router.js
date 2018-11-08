const controllers = require('./controllers');

const router = (app) => {
  app.get('/', (req, res) => { res.render('login'); });
  app.get('/about', (req, res) => { res.render('about'); });
  app.get('/dashboard', (req, res) => { res.render('app'); });
  app.get('/getToken', controllers.Account.getToken);
  app.post('/signup', controllers.Account.signup);
  app.post('/login', controllers.Account.login);
};

module.exports = router;
