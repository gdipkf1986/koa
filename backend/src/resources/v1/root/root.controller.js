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
    }
});
