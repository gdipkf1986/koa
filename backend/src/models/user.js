/**
 * Created by jovi on 3/1/16.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        username: {type: DataTypes.STRING, allowNull: false},
        picture: {type: DataTypes.STRING},
        displayName: DataTypes.STRING,
        password: {type: DataTypes.STRING},
        email: DataTypes.STRING,
        status: DataTypes.INTEGER,
        provider: {type: DataTypes.STRING},
        providerId: {type: DataTypes.STRING}
    }, {
        associate: function(models) {
            User.belongsTo(models.Role);
        }
    });
    return User;
};
