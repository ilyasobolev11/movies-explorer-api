const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

// TODO: добавить ошибки

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
    .orFail(new Error()); // TODO: добавить ошибки

  const matched = await bcrypt.compare(password, user.password);
  if (matched) {
    throw new Error(); // TODO: добавить ошибки
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
