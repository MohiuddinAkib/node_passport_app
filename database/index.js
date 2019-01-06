const debug = require('debug')('app:DB'),
  config = require('config');

module.exports = mongoose => {
  // Mongoose promise
  mongoose.Promise = global.Promise;
  // Connect to DB
  mongoose.connect(
    config.get('MONGO_URI'),
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    }
  );
  // DB error handling
  mongoose.connection
    .once('open', () => debug('DB connection established'))
    .on('error', err => debug('DB connection error', err));
};
