'use strict';
const config = require('../../../config/environment');


Object.assign(exports, {
    index: function*(next) {
        this.status = 403;
        this.body = {
            'name': 'castlery',
            'info': 'API Docs URL'
        };
    },
    auth: function*(next) {

        //if (!this.session.token) {
        //    this.response.redirect('/connect/google');
        //    return;
        //}

        const cfg = config.s3;
        delete cfg.secretKey;

        this.body = {
            success: true,
            payload: {
                config: {s3: cfg},
                token: this.session.token
            }
        };
        this.status = 200;
        yield next;
    },
    oauthCallback: function*(next) {
        yield next;

        const query = this.query;

        this.body = this.params;
        this.session.token = query.access_token; // todo: different session with
        this.status = 200;
    }
});
