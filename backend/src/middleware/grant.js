/**
 * Created by labs-huangf-mac on 1/3/16.
 */

const Grant = require('grant-koa');
const mount = require('koa-mount');
const config = require('../config/environment').grant;

module.exports = function(app) {
    const grant = new Grant(config);
    app.use(mount(grant));
};
