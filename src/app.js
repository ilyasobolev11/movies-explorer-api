require('dotenv').config({ path: '../.env' });

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { handleErrors } = require('./middlewares/handleErrors');
const { routes } = require('./routes');

const {
  PORT = 3000,
  DB_CONNECT = 'mongodb://localhost:27017/moviesdb',
} = process.env;

const app = express();

mongoose.connect(DB_CONNECT, {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
