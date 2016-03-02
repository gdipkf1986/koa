'use strict';

const controller = require('./mediaDoc.controller');
const router = require('koa-router')();

router
    .get('/', controller.list)
    .post('/', controller.createOrUpdate)
    .put('/:resourceName', controller.createOrUpdate)
    .delete('/:resourceName', controller.destroy)
    .get('/:resourceName', controller.get);

module.exports = router.routes();
