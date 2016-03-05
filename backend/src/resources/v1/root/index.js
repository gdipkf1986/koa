'use strict';

const controller = require('./root.controller');
const router = require('koa-router')();
const middleware = require('../routes.middleware');

router.use(middleware.authenticate());

router.get('/', controller.index);
router.post('/auth', controller.auth);
router.get('/oauth/callback', controller.oauthCallback);


module.exports = router.routes();
