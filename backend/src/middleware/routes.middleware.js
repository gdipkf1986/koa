/**
 * Created by jovi on 3/5/16.
 */
'use strict';

module.exports = {
    requireRole: function(roles) {
        return function*(next) {
            // get user information by session here
            let authorized = false;
            if (authorized) {
                yield next;
            } else {
                this.status = 401;
                this.body = 'your role not authorized';
            }
        };
    },
    authenticate: function() {
        return function*(next) {
            const url = this.request.url;
            console.log(`--------------> authenticating on reqesting ${url}`);

            if (this.session.user || url.indexOf('/login') > -1 || url.indexOf('/logout') > -1) {
                yield next;
            } else {
                this.status = 401;
            }
        };
    }
};
