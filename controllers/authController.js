const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = passport.authenticate('twitter', { failureRedirect: '/' });

exports.loginCallback = (req, res) => {
  res.redirect('/');
};
