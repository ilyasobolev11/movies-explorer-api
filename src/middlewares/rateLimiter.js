const limiter = require('express-rate-limit');

const rateLimiter = limiter({
  windowMs: 1000 * 60 * 10,
  max: 100,
  message: 'Превышено максимально допустимое количетво запросов',
});

module.exports = { rateLimiter };
