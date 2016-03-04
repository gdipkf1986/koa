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

        if (!this.request.body.id_token) {
            this.response.redirect('http://localhost:9001/login.html');
            yield next;
            return;
        }

        const cfg = config.s3;
        delete cfg.secretKey;

        this.body = {
            success: true,
            payload: {
                config: {s3: cfg},
                token: this.params.id_token
            }
        };
        this.status = 200;
        yield next;
    },
    oauthCallback: function*(next) {

        const query = this.query;

        this.body = `Your are logined google with token ${query.access_token.substring(0, 20)}...`;
        this.session.token = query.access_token; // todo: different session with
        this.status = 200;
        yield next;
    }
});
