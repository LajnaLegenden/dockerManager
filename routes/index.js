var express = require('express');
var router = express.Router();

let Docker = require('../modules/docker');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/Images', async (req, res, next) => {
  res.render('images', {
    images: JSON.stringify(await Docker.getImages())
  });
});


router.get('/Containers', async (req, res, next) => {
  res.render('containers', {
    containers: JSON.stringify(await Docker.getContainers())
  });
});

router.get('/Container/:id', async (req, res, next) => {
  res.send(await Docker.getContainerInfo(req.params.id));
});

module.exports = router;
