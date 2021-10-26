const routes = require('express').Router();

const { NoDataFoundError } = require('../errors');
const { usersRouter } = require('./users');

routes.use('/users', usersRouter);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected' });
});
routes.all('*', (req, res, next) => {
  next(new NoDataFoundError());
});

module.exports = { routes };
