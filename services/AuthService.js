const User = require('../models/User'),
  debug = require('debug')('app:AuthService'),
  passport = require('passport');

/**
 * @description   Stores the user data into DB during registration
 * @return        resource
 */
exports.store_user = async (req, res, values) => {
  const { name, email, password } = values;
  try {
    const user = await User.findOne({ email }).exec();
    if (user) {
      req.flash('error_msg', 'Email is already taken');
      res.redirect('/users/register');
      return;
    }

    // Email is not duplicate
    const newUser = new User({
      name,
      email,
      password
    });
    // Hash password
    await newUser.hashPassword();
    await newUser.save();
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/users/login');
  } catch (error) {
    debug('Storing user error', error);
  }
};

/**
 * @description   Authenticate user with passport local strategy
 * @return        resource
 */
exports.sign_in = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
};
