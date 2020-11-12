const { model, Schema } = require('mongoose');
const bycrpt = require('bcrypt');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  role: String,
  password: String,
  confirmPassword: String,
  createdAt: String,
});

userSchema.statics.hashPassword = function (password) {
  return bycrpt.hash(password, 10);
};

userSchema.statics.compareHash = function (expected, acctual) {
  return bycrpt.compareHash(acctual, expected);
};

module.exports = model('User', userSchema);
