/**
 * Created by labs-huangf-mac on 1/3/16.
 */

const bodyParser = require('koa-bodyparser');
module.exports = function(app) {
    app.use(bodyParser());
};
