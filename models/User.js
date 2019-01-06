const mongoose = require('mongoose'),
  timestamp = require('mongoose-timestamp'),
  debug = require('debug')('app:User model'),
  bcrypt = require('bcryptjs'),
  Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 55
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
    maxlength: 255,
    trim: true
  }
});
// Schema plugin
UserSchema.plugin(timestamp);
// Schema methods
// Hash password
UserSchema.methods.hashPassword = async function() {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;
  } catch (error) {
    debug('Bcrypt error', error);
  }
};
// Compare password
UserSchema.methods.comparePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    debug('Bcrypt compare password error', error);
  }
};
// Model
const User = mongoose.model('User', UserSchema);
// Export model
module.exports = User;
