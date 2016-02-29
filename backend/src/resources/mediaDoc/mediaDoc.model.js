/**
 * Created by jovi on 2/29/16.
 */
const sequelize = require('sequelize');

const MediaDoc = sequelize.define('user', {
    originalName: {
        type: sequelize.STRING
    },
    originalSize: {
        type: sequelize.INTEGER
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = MediaDoc;
