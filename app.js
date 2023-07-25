const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');
const routesAuth = require('./routes/auth');

const { NOT_FOUND_STATUS_CODE } = require('./utils/constants');

const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');

const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(helmet());
app.use(limiter);
app.use(cookieParser());

app.use(routesAuth);

app.use(auth);

app.use(routesUser);
app.use(routesCard);

app.use((req, res) => {
  res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Данного адреса не существует' });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
