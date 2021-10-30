const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NoDataFoundError, BadRequestError, ConflictError } = require('../errors');

const User = require('../models/user');
const { deleteTechProperties } = require('../utils/deleteTechProperties');

const { JWT_SECRET = 'dev-secret' } = process.env;

async function createUser(req, res, next) {
  try {
    const {
      email,
      password,
      name,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create(
      {
        email,
        name,
        password: passwordHash,
      },
    );

    res.status(201).send(deleteTechProperties(user));
  } catch (err) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
      next(new ConflictError(`Пользователь с ${Object.values(err.keyValue).join(', ')} уже существует`));
      return;
    }
    if (err.name === 'ValidationError') {
      next(new BadRequestError());
      return;
    }
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const credentials = req.body;

    const user = await User.findUserByCredentials(credentials);

    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    res
      .status(204)
      .cookie(
        'jwt',
        token,
        {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        },
      )
      .end();
  } catch (err) {
    next(err);
  }
}

function logoutUser(req, res, next) {
  try {
    res
      .status(204)
      .clearCookie('jwt')
      .end();
  } catch (err) {
    next(err);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const userId = req.user._id;

    const user = await User
      .findById(userId)
      .orFail(new NoDataFoundError('Пользователя с таким id не существует'));

    res.status(200).send(deleteTechProperties(user));
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

    res.status(200).send(deleteTechProperties(user));
  } catch (err) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
      next(new ConflictError(`Пользователь с ${Object.values(err.keyValue).join(', ')} уже существует`));
      return;
    }
    if (err.name === 'ValidationError') {
      next(new BadRequestError());
      return;
    }
    next(err);
  }
}

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateCurrentUser,
};
