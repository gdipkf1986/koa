/**
 * Created by jovi on 3/1/16.
 */
'use strict';

const config = require('./environment');

module.exports = function(app) {

    app.use(function *(next) {
        const conn = yield models.sequelize.sync();
        this.conn = conn;
        yield next;
    });

};
