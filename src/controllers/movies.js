const Movie = require('../models/movie');
const { NoDataFoundError, ForbiddenError } = require('../errors');
const { deleteTechProperties } = require('../utils/deleteTechProperties');

async function addMovie(req, res, next) {
  try {
    const owner = req.user._id;
    let movie = req.body;

    movie = await Movie.create({ ...movie, owner });
    res.status(201).send(deleteTechProperties(movie));
  } catch (err) {
    next(err);
  }
}

async function getMovies(req, res, next) {
  try {
    const owner = req.user._id;

    const movies = await Movie.find({ owner });
    res.status(200).send(deleteTechProperties([...movies]));
  } catch (err) {
    next(err);
  }
}

async function deleteMovie(req, res, next) {
  try {
    const { movieId } = req.params;
    const owner = req.user._id;

    await Movie
      .findById(movieId)
      .orFail(new NoDataFoundError('Фильм с указаным id не найден'));

    const deletedMovie = await Movie
      .findOneAndDelete({ _id: movieId, owner })
      .orFail(new ForbiddenError());

    res.status(200).send(deleteTechProperties(deletedMovie));
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addMovie,
  getMovies,
  deleteMovie,
};
