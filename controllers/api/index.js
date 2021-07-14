const router = require('express').Router();

const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const favoriteRoutes = require('./favoriteRoutes');

router.use('/users', userRoutes);
router.use('/items', itemRoutes);
router.use('/favorites', favoriteRoutes);

module.exports = router;
