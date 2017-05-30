const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

const verifyCallback = async (token, secret, profile, cb) => {
  const user = await User.findOne({ userID: profile._json.id_str });
  if (user !== null) return cb(null, user);

  const newUser = new User({
    userID: profile._json.id_str,
    going: []
  });
  await newUser.save();
  return cb(null, newUser);
};

passport.use(
  new Strategy(
    {
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: 'http://localhost:7777/login/return'
    },
    verifyCallback
  )
);
passport.serializeUser(function(user, cb) {
  cb(null, user.userID);
});

passport.deserializeUser(async function(id, cb) {
  const user = await User.findOne({ userID: id });
  cb(null, user);
});
