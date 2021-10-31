const {
  PORT = 3000,
  DB_CONNECT = 'mongodb://localhost:27017/moviesdb',
  JWT_SECRET = 'dev-secret',
} = process.env;

const corsWhiteList = [
  'http://movies-explorer-app.nomoredomains.work',
  'https://movies-explorer-app.nomoredomains.work',
  'http://localhost:3000',
  'https://localhost:3000',
];

const corsOptions = {
  origin: corsWhiteList,
  credentials: true,
};

module.exports = {
  PORT,
  DB_CONNECT,
  JWT_SECRET,
  corsOptions,
};
