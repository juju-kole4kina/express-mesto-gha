const mongoose = require('mongoose');
// const user = require('./user.js');
// const { Schema } = mongoose;

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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    requires: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);