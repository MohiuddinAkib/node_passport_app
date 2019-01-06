/**
 * @description   Gets the index page
 * @route         /
 * @method        GET
 * @access        public
 */
exports.index = (req, res) => {
  res.render('welcome', {
    page_title: 'welcome'
  });
};

/**
 * @description   Gets the dashboard page
 * @route         /dashboard
 * @method        GET
 * @access        private
 */
exports.dashboard = (req, res) => {
  res.render('users/dashboard', {
    page_title: 'Dashboard'
  });
};
