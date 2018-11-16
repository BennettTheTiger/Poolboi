const models = require('../models');

const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};


const logout = (req, res) => {
  Account.AccountModel.updateSignIn(req.session.account._id);
  req.session.destroy();
  res.redirect('/');
};
// login a user
const login = (request, response) => {
  const req = request;
  const res = response;
  console.dir(req.body);
  // convert to string for security reasons
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;
  // make sure there is a username and password to auth with
  if (!username || !password) {
    return res.status(400).json({ error: 'Opps all fields are required' });
  }
  // try to authenticate the user
  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'wrong username or password' });
    }
    req.session.account = Account.AccountModel.toAPI(account);
    console.log('successfully loged in');
    return res.redirect('/dashboard');
  });
};
// signup a new user
const signup = (request, response) => {
  const req = request;
  const res = response;

  console.dir(req.body);
    // case to strings for security reasons
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  console.log(`signing up user ${req.body.username} with password ${req.body.pass}`);

    // make sure all fields have content
  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'Username, and password are required' });
  }
    // check that passwords match
  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'passwords do not match' });
  }


  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    // check if the extra fields have a value if they do add them to accountData
    if (req.body.firstName) {
      console.log(`first name as ${req.body.firstName}`);
      accountData.firstName = req.body.firstName;
    }

    if (req.body.lastName) {
      console.log(`last name as ${req.body.lastName}`);
      accountData.lastName = req.body.lastName;
    }

    if (req.body.zip) {
      console.log(`zip as ${req.body.zip}`);
      accountData.zip = req.body.zip;
    }

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      console.log('made account');
      return res.json({ redirect: '/dashboard' });
    });

    savePromise.catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      return res.status(400).json({ error: 'An error occoured' });
    });
  });
};
// update a users password
const updatePassword = (req, res) => {
  Account.AccountModel.generateHash(req.body.newpass1, (salt, hash) => {
    const newPassword = {
      tablesalt: salt,
      password: hash,
    };
    Account.AccountModel.updatePassword(req.session.account._id, newPassword, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: 'Unable to change your password' });
      }
      res.status(200).json({ msg: 'password set' });
    });
  });
};

const getBasic = (request, response) => response.status(200).json(request.session.account);

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports.updatePassword = updatePassword;
module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
module.exports.getBasic = getBasic;
