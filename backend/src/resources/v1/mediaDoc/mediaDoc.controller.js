'use strict';

const parse = require('co-body');
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

function* uploadToS3(meta) {
    return new Promise((resolve, reject)=> {
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
        const key = `test/${meta.hashedName}`;
        const uploader = amazonS3Client.uploadFile({
            localFile: meta.storedFileName,
            s3Params: {
                Bucket: config.s3.bucket,
                Key: key,
                ACL: 'public-read',
                Body: meta.storedFileName
            }
        });

        uploader.on('end', function () {
            // todo: delete local temp file once file uploaded to s3
            resolve(`http://s3-ap-southeast-1.amazonaws.com/castlery/${key}`);
        });

        uploader.on('error', function () {
            reject(null);
        });

    });
}

Object.assign(exports, {
    list: function*(next) {
        const query = {limit: 20, offset: 0, 'filename': null};
        const params = this.query;
        for (let key in query) {
            if (!params.hasOwnProperty(key)) {
                continue;
            }
            if ((key === 'limit' || key === 'offset')) {
                query[key] = parseInt(params[key]) || query[key];
            }
            if (key === 'filename') {
                query.where = ['originalFileName like ?', '%' + params[key] + '%'];
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
    }
    ,
    get: function*(next) {

        const result = yield models.MediaDoc.findById(parseInt(this.params.id));
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
    post: function*(next) {
        const files = this.request.files;
        if (!files) {
            this.status = 400;
            this.body = {'message': 'no file uploaded'};
            return yield next;
        }
        const body = {success: true, payload: []};


        for (let originalFileName in files) {
            const meta = files[originalFileName];
            const s3Result = yield uploadToS3(meta);
            const result = {};

            if (!s3Result) {
                result[originalFileName] = {id: null};
                continue;
            }

            const inst = yield models.MediaDoc.create({
                originalFileName: originalFileName,
                storedFileName: s3Result,
                fileSize: meta.fileSize,
                status: MEDIA_DOC_STATUS.underReview
            });

            result[originalFileName] = inst.toJSON();
            body.payload.push(result);
        }
        this.status = 200;
        this.body = body;
        yield next;

    },
    put: function*(next) {
        //todo: for history tracking, here should be insert new record and increase version from latest
        const id = parseInt(this.params.id);
        let inst = yield models.MediaDoc.findById(id);
        if (!inst) {
            this.status = 404;
            this.body = {success: false, message: 'invalid id'};
            yield next;
            return;
        }

        const values = Object.assign(this.request.body, {id: id});
        const files = this.request.files;
        if (files) {
            // todo: add history record for this file
            const firstMeta = files[Object.keys(files)[0]];
            Object.assign(values, firstMeta);
        }
        let results = yield inst.update(values);
        this.status = 200;
        const payload = {};
        payload[models.MediaDoc.name] = [inst.toJSON()];
        this.body = {success: true, payload: payload};
        yield next;
    }
    ,
    destroy: function*(next) {
        // todo: mark as destroyed for history tracking. do we need remove file from storage if record marked as destroyed?
        const id = parseInt(this.params.id);
        let inst = yield models.MediaDoc.findById(id);
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
