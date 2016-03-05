/**
 * Created by labs-huangf-mac on 1/3/16.
 */
'use strict';

const parse = require('co-body');

module.exports = function(app) {

    app.use(function*(next) {
        try {
            this.request.body = yield parse(this);
        } catch (e) {
            this.request.body = {};
        }
        yield next;
    });
};
