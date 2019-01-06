const LocalStrategy = require('passport-local').Strategy,
  debug = require('debug')('app:passport middleware');
// Bring user model
const User = require('../models/User');

module.exports = passport => {
  // Set strategy
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email }).exec();
          if (!user) {
            return done(
              null,
              false,
              req.flash('error_msg', 'Authentication failed!')
            );
          }
          // User exists
          const isMatch = await user.comparePassword(password);
          if (!isMatch) {
            return done(
              null,
              false,
              req.flash('error_msg', 'Authentication failed')
            );
          }
          // Password matches
          done(null, user, req.flash('success_msg', 'You are now logged in'));
        } catch (error) {
          debug('Passport use error', error);
        }
      }
    )
  );

  // Passport Serialize
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Passport deserialize
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } catch (error) {
      debug('deserialize error', error);
      done(err, false);
    }
  });
};
