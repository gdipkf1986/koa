/**
 * Created by labs-huangf-mac on 1/3/16.
 */

const csrf = require('koa-csrf');

module.exports = function (app) {
    csrf(app);
    app.use(csrf.middleware);
};
