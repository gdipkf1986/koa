'use strict';

const controller = require('./mediaDoc.controller');
const router = require('koa-router')();

const routers = {
  '/': ['get', controller.list],
  '/:id': ['get', controller.get]
};

Object.keys(routers).forEach(path=> {
  const config = routers[path];
  const httpMethod = config[0];
  const ctrlMethod = config[1];
  router[httpMethod](path, ctrlMethod);
});


//router.get('/', controller.list);
module.exports = router.routes();
