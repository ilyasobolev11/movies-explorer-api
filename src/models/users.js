const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const { AuthError } = require('../errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: 'Передан невалидный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.static.findUserByCredentials = async function ({ email, password }) {
  const user = await this
    .findOne({ email })
    .select('+password')
    .orFail(new AuthError('Неправильные почта или пароль'));

  const matched = await bcrypt.compare(password, user.password);
  if (matched) {
    throw new AuthError('Неправильные почта или пароль');
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
