exports.pageNotFound = (req, res, next) => {
  const error = new Error('Page not found');
  error.status = 404;
  next(error);
};

exports.development = function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('404', {
    message: err.message,
    status: err.status || 500,
    stack: err.stack,
    page_title: 'Error'
  });
};

exports.production = function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('404', {
    message: err.message,
    status: err.status || 500,
    page_title: 'Error'
  });
};
