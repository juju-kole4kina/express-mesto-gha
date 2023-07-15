const router = require('express').Router();
const cards = require('../controllers/cards.js');

router.get('/cards', cards.getCards);

router.post('/cards', cards.createCard);

router.delete('/cards/:cardId', cards.deleteCard);

router.put('/cards/:cardId/likes', cards.putLike);

router.delete('/cards/:cardId/likes', cards.deleteLike);

module.exports = router;