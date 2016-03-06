'use strict';
const config = require('../../../config/environment');

const passport = require('koa-passport');
const request = require('koa-request');
const models = require('../../../models/');
const Status = require('../../../models/CONST_STATUS').values.USER;

Object.assign(exports, {
    index: function*(next) {
        this.status = 403;
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
    logout: function*(next) {
        this.sesssion = null;
        this.status = 200;
        this.body = 'You are logout, you can <a href="/api/v1/login">Login</a> again';
        yield next;
    }
});
