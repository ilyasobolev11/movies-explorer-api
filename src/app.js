require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const { handleErrors } = require('./middlewares/handleErrors');
const { routes } = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/loggers');
const { rateLimiter } = require('./middlewares/rateLimiter');

const {
  PORT = 3000,
  DB_CONNECT = 'mongodb://localhost:27017/moviesdb',
} = process.env;

const corsWhiteList = [
  'http://movies-explorer-app.nomoredomains.work',
  'https://movies-explorer-app.nomoredomains.work',
  'http://localhost:3000',
  'https://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (corsWhiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

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
