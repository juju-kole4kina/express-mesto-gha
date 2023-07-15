const router = require('express').Router();
const cards = require('../controllers/cards.js');

router.get('/cards', cards.getCards);

router.post('/cards', cards.createCard);

router.delete('/cards/:cardId', cards.deleteCard);

module.exports = router;