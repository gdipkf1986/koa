'use strict';

const controller = require('./mediaDoc.controller');
const router = require('koa-router')();

router
    .get('/', controller.list)
    .post('/', controller.post)
    .put('/:id', controller.put)
    .delete('/:id', controller.destroy)
    .get('/:id', controller.get);

module.exports = router.routes();
