const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.use(function(req, res, next) {
  res.locals.title = "MakeReddit";
  res.locals.currentUserId = req.session.userId;

  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  const currentUserId = req.session.userId;
  res.render('index');
});

router.get('/login', (req,res,next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  User.authenticate(req.body.username, req.body.password, (err, user) => {
    if (err || !user) {
      const next_error = new Error("Username or password incorrect");
      next_error.status = 401;

      return next(next_error);
    } else {
      /*  eslint-disable-next-line no-underscore-dangle  */
      req.session.userId = user._id;

      return res.redirect('/') ;
    }
  });
});

router.get('/logout', (req, res, next) => {
  if(req.session) {
    req.session.destroy((err) => {
      if(err) return next(err);
    });
  }
  return res.redirect('/login');
});




module.exports = router;
