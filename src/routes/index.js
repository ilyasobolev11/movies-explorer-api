const routes = require('express').Router();

const { NoDataFoundError } = require('../errors');
const { usersRouter } = require('./users');
const { moviesRouter } = require('./movies');

routes.use('/users', usersRouter);
routes.use('/movies', moviesRouter);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected' });
});
routes.all('*', (req, res, next) => {
  next(new NoDataFoundError());
});

module.exports = { routes };
