/**
 * Main application routes
 */

'use strict';

const mount = require('koa-mount');

module.exports = function(app) {
    console.log('routes init');

    // YEOMAN INJECT ROUTES BELOW
    app.use(mount('/api/mediaDocs', require('../resources/v1/mediaDoc')));
    app.use(mount('/', require('../resources/v1/root')));


};
