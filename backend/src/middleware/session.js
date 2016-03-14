/**
 * Created by labs-huangf-mac on 1/3/16.
 */

const session = require('koa-session');

module.exports = function(app) {
    app.keys = ['jovi-castlery'];
    app.use(session(app));

    app.use(function*(next) {
        //console.log('==== request ===', this.req.url);
        //console.log('==== cookies ===', this.cookies.get('koa:sess'));
        yield next;
    });
};
