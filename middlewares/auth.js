module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash('error_msg', 'Unauthorized. Please log in first');
    res.redirect('/users/login');
  },
  ensureNotAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      req.flash('error_msg', 'Bad request');
      res.redirect('/dashboard');
      return;
    }

    next();
  }
};
