/**
 * Main application routes
 */

'use strict';

const mount = require('koa-mount');
const fs = require('fs');
const path = require('path');
const routesMiddleware = require('../middleware/routes.middleware');
const rootRouter = require('koa-router')();

module.exports = function(app) {
    const v1ResourceRoot = path.join(__dirname, '..', 'resources', 'v1');

    fs
        .readdirSync(v1ResourceRoot)
        .filter((file)=> {
            return fs.statSync(path.join(v1ResourceRoot, file)).isDirectory() &&
                fs.existsSync(path.join(v1ResourceRoot, file, 'index.js'));
        })
        .forEach((dir)=> {
            console.log(`register route /api/v1/${dir === 'root' ? '' : dir}`, 'to', path.join(v1ResourceRoot, dir));
            const router = require(path.join(v1ResourceRoot, dir));
            router.use(routesMiddleware.authenticate());
            app.use(mount(`/api/v1${dir === 'root' ? '' : '/' + dir}`, router.routes()));
        });
};
