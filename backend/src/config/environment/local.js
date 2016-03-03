'use strict';

module.exports = {
    logType: 'tiny',
    db: {
        host: 'localhost',
        port: '3306',
        database: 'castleryProject',
        username: 'root',
        password: null,
        'dialect': 'mysql'
    },
    s3: {
        secretKey: 'YYRr22tyFpypWheOV9gyYtw+W8AVbjejwzX6AhNu',
        bucket: 'castlery',
        accessKeyId: 'AKIAIZWZRBSYUXLEHVFQ'
    },
    grant: {
        server: {
            protocol: 'http',
            host: '127.0.0.1:9000',
            'transport': 'session',
            'state': true
        },
        google: {
            key: '1072883307484-k8n0nhskap4ocnllfmu3vbueit4ek7sl.apps.googleusercontent.com',
            secret: 'DzsQXIjmXtTKBB2ytjD77wfm',
            callback: '/oauth/callback',
            'scope': 'https://www.googleapis.com/auth/plus.login'
        }
    }
};
