const express = require('express'),
  router = express.Router(),
  AuthController = require('../controllers/AuthController'),
  {
    ensureAuthenticated,
    ensureNotAuthenticated
  } = require('../middlewares/auth');

/**
 * @description   User's login page
 * @route         /users/login
 * @method        GET
 * @access        public
 */
router.get('/login', ensureNotAuthenticated, AuthController.login);

/**
 * @description   Store user into DB
 * @route         /users/register
 * @method        POST
 * @access        public
 */
router.post('/login', ensureNotAuthenticated, AuthController.login);

/**
 * @description   User's register page
 * @route         /users/register
 * @method        GET
 * @access        public
 */
router.get('/register', ensureNotAuthenticated, AuthController.register);

/**
 * @description   Store user into DB
 * @route         /users/register
 * @method        POST
 * @access        public
 */
router.post('/register', ensureNotAuthenticated, AuthController.store);

/**
 * @description   Signs out user
 * @route         /users/logout
 * @method        GET
 * @access        private
 */
router.get('/logout', ensureAuthenticated, AuthController.logout);

module.exports = router;
