/**
 * Main application routes
 */

'use strict';

const mount = require('koa-mount');

module.exports = function(app) {
    console.log('routes init');

    // YEOMAN INJECT ROUTES BELOW
    app.use(mount('/api/mediaDoc', require('../resources/mediaDoc')));
    app.use(mount('/', require('../resources/root')));


};
