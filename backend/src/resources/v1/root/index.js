'use strict';

const controller = require('./root.controller');
const router = require('koa-router')();

router.get('/', controller.index);
router.get('/auth', controller.auth);
router.get('/oauth/callback', controller.oauthCallback);


module.exports = router;
