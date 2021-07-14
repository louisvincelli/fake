const router = require('express').Router();
const { User, Item, Favorite } = require('../models/');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
      const userData = await User.findAll({
        where: {
          id: req.session.userId,
        },
      });
      const newUser = userData.map((user) => user.get({ plain: true }));
      console.log(newUser);
      res.render('profile');
      //, {
        //layout: 'main',
      //   newUser,
      // });
    } catch (err) {
      console.log(err);
    }
});

router.get('/profile', async(req, res) => {
    if (req.session.loggedIn) {
      const users = await User.findAll();
      console.log(users[0].dataValues.name);
      res.render('profile', {
        users,
      });
      return;
    }
    res.redirect('login');
});

module.exports = router;