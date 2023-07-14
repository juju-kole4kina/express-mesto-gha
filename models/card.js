const mongoose = require('mongoose');
const user = require('./user.js');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    reqiured: true,
  },
  owner: user,
  likes: {
    type: Array,
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model.mongoose('card', cardSchema);