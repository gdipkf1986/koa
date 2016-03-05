'use strict';

const controller = require('./mediaDoc.controller');
const router = require('koa-router')();
const routesMiddleware = require('../routes.middleware');

router
    .get('/', controller.list)
    .post('/', controller.createOrUpdate)
    .put('/:resourceName', controller.createOrUpdate)
    .delete('/:resourceName', routesMiddleware.requireRole('admin'), controller.destroy)
    .get('/:resourceName', controller.get);

module.exports = router.routes();
