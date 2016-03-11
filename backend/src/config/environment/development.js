'use strict';



// Development configuration
module.exports = {
    logType: 'tiny',
    db: {
        host: 'localhost',
        port: '',
        database: '',
        username: 'root',
        password: null,
        'dialect': 'mysql'
    },
    s3: {
        secretKey: '',
        bucket: '',
        accessKeyId: ''
    },
    grant: {
        server: {
            protocol: 'http',
            host: '127.0.0.1:9000'
        },
        google: {
            key: '',
            secret: '',
            callback: '/oauth/callback',
            'scope': 'https://www.googleapis.com/auth/plus.login'
        }
    }
};
