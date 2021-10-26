const usersRouter = require('express').Router();

const {
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/users');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateCurrentUser);

module.exports = { usersRouter };
