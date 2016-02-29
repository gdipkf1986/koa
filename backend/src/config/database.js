/**
 * Created by jovi on 3/1/16.
 */
'use strict';

const config = require('./environment');
const Sequelize = require('sequelize');

module.exports = function(app) {

    // Logger
    app.use(function *(next) {

        const sequelize = new Sequelize(config.db.dbName, config.db.user, config.db.password, {
            host: config.db.host,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        });

        this.req._conn = sequlize;
        yield next;
    });

};
