/**
 * Main application routes
 */

'use strict';

const mount = require('koa-mount');

module.exports = function(app) {

    // YEOMAN INJECT ROUTES BELOW
    app.use(mount('/mediaDoc', require('../resources/mediaDoc')));
    app.use(mount('/', require('../resources/root')));


};
