const jsonwebtoken = require('jsonwebtoken');

// const { NODE_ENV, JWT_SECRET } = process.env;
const JWT_SECRET = '686b888065dc0105ef5799cae9ea58bae758dec68a657e4f3ff2d673a2048cdd';
const { UNAUTHORIZATION_STATUS_CODE } = require('../utils/constants');

const auth = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    res
      .status(UNAUTHORIZATION_STATUS_CODE)
      .send({ message: 'Куки не найден' });
    return;
  }

  const token = jwt;
  let payload;

  try {
    payload = jsonwebtoken.verify(token, JWT_SECRET);
  } catch (err) {
    res
      .status(UNAUTHORIZATION_STATUS_CODE)
      .send({ message: 'Необходима авторизация' });
    return;
  }

  req.user = payload;

  next();
};

module.exports = { auth };
