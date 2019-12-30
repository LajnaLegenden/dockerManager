var express = require('express');
var router = express.Router();

let Docker = require('../modules/docker');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', (req, res, next) => {
  Docker()
  res.send("asdasd");
});

module.exports = router;
