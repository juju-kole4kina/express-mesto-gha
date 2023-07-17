const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64b1a34d0bdf597b4fca7583',
  };
  next();
});

app.use(routesUser);
app.use(routesCard);

app.use((req, res) => {
  res.status(404).send({ message: 'Данного адреса не существует' });
});

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});