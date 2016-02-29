/**
 * Koa config
 */

'use strict';

const config = require('./environment');
const morgan = require('koa-morgan');

module.exports = function(app) {

    // Logger
    app.use(morgan.middleware(config.logType));

};
