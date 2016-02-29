'use strict';

const controller = require('./mediaDoc.controller');
const router = require('koa-router')();

router
    .get('/', controller.list)
    .post('/', controller.post)
    .get('/:id', controller.get);


//router.get('/', controller.list);
module.exports = router.routes();
