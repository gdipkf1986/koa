/**
 * Created by jovi on 3/1/16.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    const MediaDoc = sequelize.define('mediaDoc', {
        originalFileName: DataTypes.STRING,
        fileSize: DataTypes.INTEGER,
        storedFileName: DataTypes.STRING
    });

    return MediaDoc;
};
