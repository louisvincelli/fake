const router = require('express').Router();
const { User, Item, Favorite } = require('../models/');


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.render('homepage');
      return;
    }
    res.render('login');
});
  
// router.get('/signup', (req, res) => {
//     if (req.session.loggedIn) {
//       res.redirect('/');
//       return;
//     }
//     res.render('signup');
// });

module.exports = router;