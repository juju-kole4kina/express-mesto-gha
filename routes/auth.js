const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const users = require('../controllers/users');
const login = require('../controllers/login');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(true).unique(true).pattern('^(([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$'),
    password: Joi.string().required(true).min(8).select(false),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(true).unique(true).pattern('^(([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$'),
    password: Joi.string().required(true).min(8).select(false),
  }),
}), users.createUser);

module.exports = router;
