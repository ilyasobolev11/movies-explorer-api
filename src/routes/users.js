const usersRouter = require('express').Router();

const {
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/users');
const { updateUserReqValidator } = require('../middlewares/reqValidator');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateUserReqValidator, updateCurrentUser);

module.exports = { usersRouter };
