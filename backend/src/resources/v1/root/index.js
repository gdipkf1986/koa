'use strict';

const controller = require('./root.controller');
const router = require('koa-router')();

router.all('/', controller.index);
router.get('/auth', controller.auth);
router.post('/login', controller.login);
router.get('/oauth/callback', controller.oauthCallback);


module.exports = router;
