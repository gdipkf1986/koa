/**
 * Main application routes
 */

'use strict';

const mount = require('koa-mount');

module.exports = function(app) {
    console.log('routes init');

    app.use(mount('/api/v1/mediaDocs', require('../resources/v1/mediaDoc')));
    app.use(mount('/', require('../resources/v1/root')));

};
