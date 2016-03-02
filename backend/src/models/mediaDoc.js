/**
 * Created by jovi on 3/1/16.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    const MediaDoc = sequelize.define('MediaDoc', {
        originalFileName: DataTypes.STRING,
        fileSize: DataTypes.INTEGER,
        storedFileName: DataTypes.STRING,
        status: DataTypes.INTEGER
    });
    return MediaDoc;
    //return {
    //    model: MediaDoc,
    //    name: MediaDoc.name,
    //    create: function* (data) {
    //        const inst = yield MediaDoc.create(data);
    //         todo: add to cache layer;
    //return inst;
    //}
    //};
};
