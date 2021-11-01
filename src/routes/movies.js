const moviesRouter = require('express').Router();

const {
  addMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');
const { addMovieReqValidator, deleteMovieReqValidator } = require('../middlewares/reqValidator');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', addMovieReqValidator, addMovie);
moviesRouter.delete('/:movieId', deleteMovieReqValidator, deleteMovie);

module.exports = { moviesRouter };
