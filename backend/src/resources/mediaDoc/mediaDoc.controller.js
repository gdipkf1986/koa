'use strict';

const os = require('os');
const parse = require('co-busboy');
const fs = require('fs');
const path = require('path');
const meter = require('stream-meter');

const models = require('../../models');

const list = ()=> [];
const allowedExt = ['jpg'];

const isValidFile = (fileOriName, fileStream)=> true;

const isValidCsrf = (ctx, csrf) => true;

Object.assign(exports, {
    index: function*(next) {

    },
    list: function*(next) {
        this.status = 200;
        this.body = list();
        yield next;
    },
    get: function*(next) {
        this.status = 200;
        this.body = {};
        yield next;
    },
    post: function*() {
        const files = this.request.files;
        if (!files) {
            this.status = 400;
            this.body = {'message': 'no file uploaded'};
            return yield next;
        }
        const body = {success: true, payload: []};
        for (let originalFileName in files) {
            const meta = files[originalFileName];
            const inst = yield models.MediaDoc.create({
                originalFileName: originalFileName,
                storedFileName: meta.tmpPath,
                fileSize: meta.fileSize
            });
            body.payload.push(inst.toJSON());
        }
        this.status = 200;
        this.body = body;

    },
    put: function*(next) {

    },
    destroy: function*(next) {

    }
});
