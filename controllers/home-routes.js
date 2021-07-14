const router = require('express').Router();
const { User } = require('../models/');
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
      res.render('homepage');
      //, {
        //layout: 'main',
      //   newUser,
      // });
    } catch (err) {
      console.log(err);
    }
});

// router.get('/homepage', async (req, res) => {
//     if (req.session.loggedIn) {
//       // User.findAll({
//       //   where: {
//       //     id: req.session.userId,
//       //   }, function (data) {
//       //     var dataobj = {
//       //       loggedUser: data,
//       //     }
//       //   }
//       // });
      
//     }
//     res.render('login');
// });

// var obj = {name: 'Bobby', email: 'bobby@gmail.com'};

router.get('/homepage', async(req, res) => {
  if (req.session.loggedIn) {
    const users = await User.findAll();
    console.log(users[0].dataValues.name);
    res.render('homepage', {
      users,
    });
    return;
  }
  res.redirect('login');
});

router.get('/homepage', async(req, res) => {
  if (req.session.loggedIn) {
    const users = await User.findOne();
    console.log(users[0].dataValues.name);
    res.render('homepage', {
      users,
    });
    return;
  }
  res.redirect('login');
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.render('homepage');
      return;
    }
    res.render('login');
});
  // router.get('/signup', (req, res) => {
  //   if (req.session.loggedIn) {
  //     res.redirect('/');
  //     return;
  //   }
  //   res.render('signup');
// });

module.exports = router;