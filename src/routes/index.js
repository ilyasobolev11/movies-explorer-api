const routes = require('express').Router();

const { NoDataFoundError } = require('../errors');
const { usersRouter } = require('./users');
const { moviesRouter } = require('./movies');
const { createUser, loginUser, logoutUser } = require('../controllers/users');
const { authUser } = require('../middlewares/auth');

routes.post('/signup', createUser);
routes.post('signin', loginUser);

routes.use(authUser);

routes.use('/users', usersRouter);
routes.use('/movies', moviesRouter);
routes.delete('/signout', logoutUser);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected' });
});
routes.all('*', (req, res, next) => {
  next(new NoDataFoundError());
});

module.exports = { routes };
