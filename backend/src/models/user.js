/**
 * Created by jovi on 3/1/16.
 */
'use strict';

let STATUS = require('./CONST_STATUS').USER;
STATUS = Object.keys(STATUS).map(k=>STATUS[k]);

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        username: {type: DataTypes.STRING, allowNull: false},
        displayName: DataTypes.STRING,
        password: {type: DataTypes.STRING},
        email: DataTypes.STRING,
        status: DataTypes.INTEGER,
        loginMethod: {type: DataTypes.INTEGER, defaultValue: 0},
        loginToken: {type: DataTypes.STRING, defaultValue: 0}
    }, {
        associate: function(models) {
            User.belongsTo(models.Role);
        }
    });
    return User;
};
