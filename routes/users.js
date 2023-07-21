const router = require('express').Router();
const users = require('../controllers/users');

router.get('/users', users.getUsers);

router.get('/users/:userId', users.getUserId);

router.get('/users/me', users.getActiveUser);

router.patch('/users/me', users.updateUser);

router.patch('/users/me/avatar', users.updateAvatar);

module.exports = router;
