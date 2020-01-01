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

router.post('/container/:name/:action', async (req, res, next) => {
  switch (req.params.action) {
    case "stop":
      Docker.stopContainer(req.params.name);
      res.send("reload");
      break;
    case "restart":
      Docker.restartContainer(req.params.name);
      res.send("reload");
      break;
    case "logs":
      let logs = await Docker.getLogs(req.params.name);
      res.send(logs);
      break;
  }

});

router.post('/image/:action', (req, res, next) => {
  console.log(req.body);
  switch (req.params.action) {
    case "create":
      Docker.createContainer(req.body);
      break;
    case "restart":
    //  Docker.restartContainer(req.params.name);
  }
  res.send("reload");
});




module.exports = router;
