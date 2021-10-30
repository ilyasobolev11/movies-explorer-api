const { celebrate, Joi } = require('celebrate');
const { AuthError } = require('../errors');

const cookiesShema = Joi.object().keys({
  jwt: Joi.string().required().error(new AuthError()),
});

const authReqValidator = (req, res, next) => {
  const { cookies } = req;

  const { error: err } = cookiesShema.validate(cookies);

  if (err) {
    next(err);
    return;
  }
  next();
};

const creareUserReqValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginUserReqValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

const updateUserReqValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const addMovieReqValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailer: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    moviedId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieReqValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  creareUserReqValidator,
  loginUserReqValidator,
  authReqValidator,
  updateUserReqValidator,
  addMovieReqValidator,
  deleteMovieReqValidator,
};
