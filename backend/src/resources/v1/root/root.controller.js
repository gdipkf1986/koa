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

        this.body = {
            success: true,
            payload: {
                config: {s3: config.s3}
            }
        };
        this.status = 200;
    }
});
