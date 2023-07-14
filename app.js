const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routesUser = require('./routes/users.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routesUser);

mongoose.connect('mongodb://localhost:27017/mestodb',{});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});