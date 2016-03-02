/**
 * Created by labs-huangf-mac on 1/3/16.
 */
'use strict';

const os = require('os');
const parse = require('co-busboy');
const fs = require('fs');
const path = require('path');
const meter = require('stream-meter');

const isValidFile = (fileOriName, fileStream)=> true;

const isValidCsrf = (ctx, csrf) => true;

module.exports = function (app) {
    console.log('multipart inited');

    app.use(function*(next) {

        if (!this.request.is('multipart/*')) {
            return yield next;
        }
        const ctx = this;
        const parts = parse(this, {
                autoFields: true,
                limits: {
                    fileSize: 1 * 1024 * 1024
                },
                checkField: (name, value)=> {
                    if (name === '_csrf' && !isValidCsrf(ctx, value)) {
                        const err = new Error('invalid csrf');
                        err.status = 400;
                        return err;
                    }
                },
                checkFile: (fieldName, fileStream, fileName)=> {
                    if (!isValidFile(fileName, fileStream)) {
                        const err = new Error('invalid file');
                        err.status = 400;
                        return err;
                    }
                }
            })
            ;
        let file = null;
        let part = null;
        const files = [];

        function* read(part) {
            return new Promise((resolve)=> {
                const resourceName = Math.random().toString().replace('.', '');
                const tmpPath = path.join(os.tmpdir(), resourceName);
                const m = meter();
                let stream = fs.createWriteStream(tmpPath);
                part.pipe(m).pipe(stream).on('finish', ()=> {
                    resolve({fileSize: m.bytes, localTmpPath: tmpPath, resourceName: resourceName});
                });
            });

        }

        while (part = yield parts) {
            files[part.filename] = yield read(part);
        }
        this.request.files = files;
        yield next;
    });
};
