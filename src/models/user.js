const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  role: String,
  password: String,
  confirmPassword: String,
  createdAt: String,
});

module.exports = model('User', userSchema);
