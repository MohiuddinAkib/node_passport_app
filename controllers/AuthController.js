const registerInputValidation = require('../validations/register-input-validation'),
  loginInputValidation = require('../validations/login-input-validation'),
  AuthService = require('../services/AuthService');

/**
 * @description   User's login page
 * @route         /users/login
 * @method        GET
 * @access        public
 */
exports.login = (req, res, next) => {
  switch (req.method) {
    case 'GET':
      res.render('auth/login', {
        page_title: 'Login'
      });
      break;

    case 'POST':
      signIn(req, res, next);
      break;

    default:
      res.render('auth/login', {
        page_title: 'Login'
      });
  }
};

/**
 * @description   User's register page
 * @route         /users/register
 * @method        GET
 * @access        public
 */
exports.register = (req, res) => {
  res.render('auth/register', {
    page_title: 'Register'
  });
};

/**
 * @description   Store user into DB
 * @route         /users/register
 * @method        POST
 * @access        public
 */
exports.store = (req, res) => {
  // Validate user input
  const { errors, isValid, values } = registerInputValidation(req.body);
  if (!isValid) {
    const { name, email, password, password_confirmation } = req.body;
    res.render('auth/register', {
      page_title: 'Register',
      errors,
      name,
      email,
      password,
      password_confirmation
    });
  } else {
    AuthService.store_user(req, res, values);
  }
};

/**
 * @description   Signs user in
 * @route         /users/login
 * @method        POST
 * @access        public
 */
const signIn = (req, res, next) => {
  // Validate user input
  const { errors, isValid } = loginInputValidation(req.body);
  if (!isValid) {
    req.flash(
      'error_msg',
      'Please fill up the form with valid email and password'
    );
    res.redirect('/users/login');
  } else {
    AuthService.sign_in(req, res, next);
  }
};

/**
 * @description   Signs out user
 * @route         /users/logout
 * @method        GET
 * @access        private
 */
exports.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are now logged out');
  res.redirect('/users/login');
};
