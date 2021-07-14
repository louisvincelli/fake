const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const loginRoutes = require('./login-routes');
const profileRoutes = require('./profile-routes');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/profile', profileRoutes);
router.use('/api', apiRoutes);

module.exports = router;
