const INTERNAL_SERVER_ERROR = 500;

function handleErrors(err, req, res, next) {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
}

module.exports = { handleErrors };
