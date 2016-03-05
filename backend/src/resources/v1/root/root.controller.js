'use strict';
const config = require('../../../config/environment');

const passport = require('koa-passport');

Object.assign(exports, {
    index: function*(next) {
        this.status = 403;
        this.body = {
            'name': 'castlery',
            'info': 'API Docs URL'
        };
    },
    auth: function*(next) {

        if (this.isAuthenticated()) {
            const cfg = config.s3;
            delete cfg.secretKey;

            this.body = {
                success: true,
                payload: {
                    config: {s3: cfg},
                    token: Math.random()
                }
            };
            yield next;
            this.status = 200;
        } else {
            this.status = 401;
            this.body = {};
        }
    },
    oauthCallback: function*(next) {

        const query = this.query;

        this.body = `Your are logined google with token ${query.access_token.substring(0, 20)}...`;
        this.session.token = query.access_token; // todo: different session with
        this.status = 200;
        yield next;
    }
});
