/**
 * Created by labs-huangf-mac on 1/3/16.
 */

const cors = require('kcors');

module.exports = function (app) {
    app.use(cors({credentials: true}));
};
