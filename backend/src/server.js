/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = require('./config/environment');
const co = require('co');
const models = require('./models');

// Bootstrap server
const app = require('koa')();
require('./config/koa')(app);
require('./config/routes')(app);

// Start server
if (!module.parent) {
    co(function*() {
        const conn = yield models.sequelize.sync();
        if (conn) {
            app.listen(config.port, config.ip, function() {
                console.log('Koa server listening on %d, in %s mode', config.port, config.env);
            });
        } else {
            console.error('connect is not able to establed, please check configuration');
        }
    })


}

// Expose app
module.exports = app;
