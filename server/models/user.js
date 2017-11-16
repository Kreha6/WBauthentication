const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcypt-nodejs');

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(11, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

const model = mongoose.model('user', userSchema);

module.exports = model;
