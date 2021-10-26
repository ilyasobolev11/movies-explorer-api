const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;

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
    this.statusCode = BAD_REQUEST;
  }
}

class AuthError extends HttpError {
  constructor(message) {
    super(message ?? 'Необходима аутентификация');
    this.statusCode = UNAUTHORIZED;
  }
}

class ForbiddenError extends HttpError {
  constructor(message) {
    super(message ?? 'Недостаточно прав');
    this.statusCode = FORBIDDEN;
  }
}

class NoDataFoundError extends HttpError {
  constructor(message) {
    super(message ?? 'Запрашиваемый ресурс не найден');
    this.statusCode = NOT_FOUND;
  }
}

class ConflictError extends HttpError {
  constructor(message) {
    super(message ?? 'Невозможно выполнить');
    this.statusCode = CONFLICT;
  }
}

module.exports = {
  BadRequestError,
  AuthError,
  ForbiddenError,
  NoDataFoundError,
  ConflictError,
};
