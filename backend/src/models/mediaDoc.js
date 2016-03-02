/**
 * Created by jovi on 3/1/16.
 */
'use strict';

module.exports = function (sequelize, DataTypes) {
    const MediaDoc = sequelize.define('MediaDoc', {
        originalFileName: {type: DataTypes.STRING, allowNull: false},
        fileSize: DataTypes.INTEGER,
        resourceName: {type: DataTypes.STRING},
        description: DataTypes.STRING,
        accessUrl: DataTypes.STRING,
        status: {type: DataTypes.INTEGER, defaultValue: 0},
        version: {type: DataTypes.INTEGER, defaultValue: 0}
    }, {
        indexes: [{
            fields: ['resourceName']
        }, {
            fields: ['description'] // todo: full text search by MyISAM engine
        }]

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
