/**
 * Created by jovi on 3/5/16.
 */
'use strict';

module.exports = {
    requireRole: function(roles) {
        return function*(next) {
            // get user information here
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
            // check if user logined
            yield next;
        };
    }
};
