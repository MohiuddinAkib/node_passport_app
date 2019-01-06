const express = require('express'),
  router = express.Router(),
  HomeController = require('../controllers/HomeController'),
  { ensureAuthenticated } = require('../middlewares/auth');

/**
 * @description   Gets the index page
 * @route         /
 * @method        GET
 * @access        public
 */
router.get('/', HomeController.index);

/**
 * @description   Gets the dashboard page
 * @route         /dashboard
 * @method        GET
 * @access        private
 */
router.get('/dashboard', ensureAuthenticated, HomeController.dashboard);

module.exports = router;
