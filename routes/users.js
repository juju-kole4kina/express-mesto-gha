const router = require('express').Router();
const users = require('../controllers/users.js');

router.get('/users', users.getUsers);

router.get('/users/:userId', users.getUserId);

router.post('/users', users.createUser);

module.exports = router;