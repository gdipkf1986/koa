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

        const cfg = config.s3;
        delete cfg.secretKey;

        this.body = {
            success: true,
            payload: {
                config: {s3: cfg}
            }
        };
        this.status = 200;
    },
    oauthCallback: function*(next) {
        console.log(this.request.body, this.params, this.query);
        this.body = this.params;
        this.status = 200;
        yield next;
    }
});
