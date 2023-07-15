const router = require('express').Router();
const users = require('../controllers/users');

router.get('/users', users.getUsers);

router.get('/users/:userId', users.getUserId);

router.post('/users', users.createUser);

router.patch('/users/me', users.updateUser);

router.patch('/users/me/avatar', users.updateAvatar);

module.exports = router;
