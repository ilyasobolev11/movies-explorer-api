const moviesRouter = require('express').Router();

const {
  addMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', addMovie);
moviesRouter.delete('/:movieId', deleteMovie);

module.exports = { moviesRouter };
