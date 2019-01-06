const express = require('express'),
  mongoose = require('mongoose'),
  debug = require('debug')('app:heart'),
  ErrorController = require('./controllers/ErrorController'),
  app = express();

// Core module
const path = require('path');

// Static folders n files
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
require('./middlewares')(app);

// Routes
app.use('/', require('./routes'));
app.use('/users', require('./routes/users'));

// Page not found
app.use(ErrorController.pageNotFound);
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(ErrorController.development);
}
// production error handler
// won't print stacktrace
app.use(ErrorController.production);

// Server port number
const PORT = process.env.PORT || 8000;
// Listen for request
app.listen(PORT, () => {
  // Status of app startup
  debug(`Server running on port ${PORT}`);

  // Database connection
  require('./database')(mongoose);
});
