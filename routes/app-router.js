var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/films');
});

router.get('/films', function(req, res, next) {
  res.render('films', { title: 'Список фильмов' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Авторизация' });
});

router.post('/films', function(req, res, next) {
  res.redirect('/films');
});


module.exports = router;
