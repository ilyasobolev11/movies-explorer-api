const { ERR_CODE } = require('../utils/constants');

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class HttpError extends CustomError {}

class BadRequestError extends HttpError {
  constructor(message) {
    super(message ?? 'Переданы некорректные данные');
    this.statusCode = ERR_CODE.BAD_REQUEST;
  }
}

class AuthError extends HttpError {
  constructor(message) {
    super(message ?? 'Необходима аутентификация');
    this.statusCode = ERR_CODE.UNAUTHORIZED;
  }
}

class ForbiddenError extends HttpError {
  constructor(message) {
    super(message ?? 'Недостаточно прав');
    this.statusCode = ERR_CODE.FORBIDDEN;
  }
}

class NoDataFoundError extends HttpError {
  constructor(message) {
    super(message ?? 'Запрашиваемый ресурс не найден');
    this.statusCode = ERR_CODE.NOT_FOUND;
  }
}

class ConflictError extends HttpError {
  constructor(message) {
    super(message ?? 'Невозможно выполнить');
    this.statusCode = ERR_CODE.CONFLICT;
  }
}

module.exports = {
  BadRequestError,
  AuthError,
  ForbiddenError,
  NoDataFoundError,
  ConflictError,
};
