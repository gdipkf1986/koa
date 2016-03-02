'use strict';

const parse = require('co-body');
const path = require('path');
const config = require('../../../config/environment');
const models = require('../../../models');
const s3 = require('s3');


const MEDIA_DOC_STATUS = require('../../../models/CONST_MEDIADOC_STATUS');

const amazonS3Client = s3.createClient({
    multipartUploadThreshold: 20971520, // 20 MB
    multipartUploadSize: 15728640, // 15 MB
    s3Options: {
        accessKeyId: config.s3.accessKeyId,
        secretAccessKey: config.s3.secretKey
    }
});

function* uploadToS3(originalFileName, meta) {
    return new Promise((resolve, reject)=> {
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
        const key = `test/${Math.random().toString().replace('.', '')}${path.extname(originalFileName)}`;
        const uploader = amazonS3Client.uploadFile({
            localFile: meta.localTmpPath,
            s3Params: {
                Bucket: config.s3.bucket,
                Key: key,
                ACL: 'public-read',
                Body: meta.localTmpPath
            }
        });

        uploader.on('end', function () {
            // todo: delete local temp file once file uploaded to s3
            resolve(`http://s3-ap-southeast-1.amazonaws.com/${config.s3.bucket}/${key}`);
        });

        uploader.on('error', function () {
            reject(null);
        });

    });
}

Object.assign(exports, {
    list: function*(next) {
        const query = {limit: 20, offset: 0, 'filename': null, where: {version: 0}};
        const params = this.query;
        for (let key in query) {
            if (!params.hasOwnProperty(key) || key === 'where') {
                continue;
            }
            if ((key === 'limit' || key === 'offset')) {
                query[key] = parseInt(params[key]) || query[key];
            }
            if (key === 'filename') {
                query.where['originalFileName'] = {'like': '%' + params[key] + '%'};
            }
        }

        query.order = [['id', 'DESC']];
        const results = yield models.MediaDoc.findAndCount(query);
        this.status = 200;
        const payload = {};
        payload[models.MediaDoc.name] = results.rows.map(r=> {
            delete r.storedFileName;
            return r;
        });
        this.body = {
            success: true,
            count: results.count,
            payload: payload
        }
        ;
        yield next;
    },
    get: function*(next) {

        const result = yield models.MediaDoc.find({where: {resourceName: this.params.resourceName, version: 0}});
        if (result) {
            this.status = 200;
            const payload = {};
            payload[models.MediaDoc.name] = [result];
            this.body = {
                success: true,
                payload: payload
            };
        } else {
            this.status = 404;
        }

        yield next;
    },
    createOrUpdate: function*(next) {
        let filesMetaObject = this.request.files;
        const resourceName = this.params.resourceName;
        let currentLatestRecord = null;
        if (resourceName) {

            //if (originalNames.length > 1) {
            //    this.status = 400;
            //    this.body = {message: 'only one file allowed'};
            //    yield next;
            //    return;
            //}

            currentLatestRecord = yield models.MediaDoc.find({
                limit: 1,
                where: {resourceName: resourceName, version: 0}
            });
            if (!currentLatestRecord) {
                this.status = 404;
                this.body = {success: false, message: 'invalid id'};
                yield next;
                return;
            }
        }
        if (filesMetaObject) {
            const originalNames = Object.keys(filesMetaObject);

            const body = {success: true, payload: [[], []]};
            for (let originalFileName in filesMetaObject) {
                const meta = filesMetaObject[originalFileName];
                const s3Result = yield uploadToS3(originalFileName, meta);
                if (!s3Result) {
                    body.payload[1].push(originalFileName);
                    continue;
                }

                const data = {
                    originalFileName: originalFileName,
                    fileSize: meta.fileSize,
                    resourceName: meta.resourceName,
                    description: '',
                    accessUrl: s3Result,
                    status: MEDIA_DOC_STATUS.underReview,
                    version: 0
                };
                if (currentLatestRecord) {
                    let maxVersionResult = yield models.MediaDoc.max('version');
                    currentLatestRecord.version = maxVersionResult + 1;
                    yield currentLatestRecord.save();
                    data.description = currentLatestRecord.description;
                    data.resourceName = currentLatestRecord.resourceName;
                }

                if (this.request.body) {
                    data.description = this.request.body.description
                }

                const newInst = yield models.MediaDoc.create(data);
                body.payload[0].push(newInst.toJSON());
            }
            this.status = 200;
            this.body = body;
        } else {
            yield currentLatestRecord.update({description: this.request.body.description});
            this.status = 200;
            this.body = {success: true, payload: currentLatestRecord.toJSON()}
        }
        yield next;

    },
    destroy: function*(next) {
        // todo: once latest version destroyed, how to process previous versions?
        const resourceName = this.params.resourceName;
        let inst = yield models.MediaDoc.find({where: {resourceName: resourceName, version: 0}, limit: 1});
        if (!inst) {
            this.status = 404;
            this.body = {success: false, message: 'unknown id'}
        } else {
            let updateResult = yield inst.update({status: MEDIA_DOC_STATUS.destroyed});
            if (updateResult.status === MEDIA_DOC_STATUS.destroyed) {
                this.status = 200;
            } else {
                this.status = 400;
            }
        }
        yield next;
    }
});
