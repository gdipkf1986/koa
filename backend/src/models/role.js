/**
 * Created by jovi on 3/1/16.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    const Role = sequelize.define('Role', {
        name: DataTypes.STRING
    });
    return Role;
};
