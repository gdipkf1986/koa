/**
 * Created by labs-huangf-mac on 1/3/16.
 */

const cors = require('kcors');

module.exports = function (app) {
    console.log('cross domain inited');
    app.use(cors({credentials: true}));
};
