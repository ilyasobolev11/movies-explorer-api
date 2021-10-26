const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NoDataFoundError, BadRequestError } = require('../errors');

const User = require('../models/user');
// TODO: add deleteTechProperties?

const { JWT_SECRET = 'dev-secret' } = process.env;

// async function createUser(req, res, next) {

// }

// async function loginUser(req, res, next) {

// }

// function logoutUser(req, res, next) {

// }

async function getCurrentUser(req, res, next) {
  try {
    const userId = req.user._id;

    const user = await User
      .findById(userId)
      .orFail(new NoDataFoundError('Пользователя с таким id не существует'));

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
}

async function updateCurrentUser(req, res, next) {
  try {
    const userId = req.user._id;
    const dataToUpdate = req.body;

    const user = await User
      .findByIdAndUpdate(
        userId,
        dataToUpdate,
        { new: true, runValidators: true },
      )
      .orFail(new NoDataFoundError('Пользователя с таким id не существует'));

    res.status(200).send(user);
  } catch (err) {
    // TODO: отловить ошибку с одинаковыми email
    // TODO: отлов ошибки по одному свойству - code?
    if (err.name === 'ValidationError') {
      next(new BadRequestError());
      return;
    }
    next(err);
  }
}

module.exports = {
  getCurrentUser,
  updateCurrentUser,
};
