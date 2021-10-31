const { ERR_CODE } = require('../utils/constants');

function handleErrors(err, req, res, next) {
  const { statusCode = ERR_CODE.INTERNAL_SERVER, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERR_CODE.INTERNAL_SERVER
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
}

module.exports = { handleErrors };
