const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = passport.authenticate('twitter', { failureRedirect: '/' });

exports.loginCallback = (req, res) => {
  let redirectURL = '/';

  if (req.session.q) {
    redirectURL = `/?q=${req.session.q}`;
    req.session.q = null;
  }

  res.redirect(redirectURL);
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json({ redirectURL: '/login' });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
