const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { UNAUTHORIZATION_STATUS_CODE } = require('../utils/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startWhith('Bearer ')) {
    return res.status(UNAUTHORIZATION_STATUS_CODE).send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return res.status(UNAUTHORIZATION_STATUS_CODE).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};

module.exports = { auth };
