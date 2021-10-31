require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const { PORT, DB_CONNECT, corsOptions } = require('./config');
const { handleErrors } = require('./middlewares/handleErrors');
const { routes } = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/loggers');
const { rateLimiter } = require('./middlewares/rateLimiter');

const app = express();

mongoose.connect(DB_CONNECT, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(rateLimiter);
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
