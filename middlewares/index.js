const bodyParser = require('body-parser'),
  helmet = require('helmet'),
  compression = require('compression'),
  passport = require('passport'),
  cookieSession = require('cookie-session'),
  flash = require('connect-flash'),
  debug = require('debug')('app:middlewares'),
  config = require('config'),
  expressLayouts = require('express-ejs-layouts');

module.exports = app => {
  // Passport config
  require('./passport')(passport);
  // Body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // Helmet
  app.use(helmet());
  // Compression
  app.use(compression());
  // Express session
  app.use(
    cookieSession({
      name: 'session',
      keys: [config.get('secretOfSession')],
      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
  );
  // Connect flash
  app.use(flash());
  // Passport
  app.use(passport.initialize());
  app.use(passport.session());
  // Morgan
  if (app.get('env') === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
    debug('Morgan enabled...');
  }

  // View engine
  app.set('view engine', 'ejs');
  // Default layout
  app.set('layout', 'layouts/main');
  // EJS layouts
  app.use(expressLayouts);

  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });

  // App locals
  app.locals.APP_NAME = config.get('APP_NAME');
};
