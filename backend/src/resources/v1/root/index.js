'use strict';

const controller = require('./root.controller');
const router = require('koa-router')();

router.all('/', controller.index);
router.post('/login', controller.login);


module.exports = router;
