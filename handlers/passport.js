const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;

passport.use(
  new Strategy(
    {
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: 'http://127.0.0.1:7777/login/return'
    },
    (token, tokenSecret, profile, cb) => {
      return cb(null, profile);
    }
  )
);
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
