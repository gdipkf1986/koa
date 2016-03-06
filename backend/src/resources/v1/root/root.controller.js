'use strict';
const config = require('../../../config/environment');

const passport = require('koa-passport');
const request = require('koa-request');
const models = require('../../../models/');
const Status = require('../../../models/CONST_STATUS').values.USER;

Object.assign(exports, {
    index: function*(next) {
        this.status = 200;
        this.body = {
            'name': 'castlery',
            'info': 'API Docs URL'
        };
    },
    login: function*(next) {
        const token = this.request.body.id_token;
        const response = yield request(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
        const body = JSON.parse(response.body);
        const name = body.name;
        const email = body.email;

        const result = yield models.User.findCreateFind({
            where: {
                email: email
            },
            defaults: {
                username: email,
                picture: '',
                displayName: name,
                password: Math.random(),
                email: email,
                status: Status.active,
                provider: 'google',
                providerId: ''
            }
        });
        const user = result[0];
        this.session.user = user.toJSON();
        this.status = 200;
        yield next;
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
