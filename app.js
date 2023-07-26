const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');

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

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(true).email({ minDomainSegments: 2, tlds: { allow: true } }),
    password: Joi.string().required(true).min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
    email: Joi.string().required(true).email({ minDomainSegments: 2, tlds: { allow: true } }),
    password: Joi.string().required(true).min(8),
  }),
}), createUser);

app.use(auth);

app.use(routesUser);
app.use(routesCard);

app.use((req, res) => {
  res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Данного адреса не существует' });
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
