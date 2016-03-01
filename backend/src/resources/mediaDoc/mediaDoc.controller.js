'use strict';

const parse = require('co-body');

const models = require('../../models');

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
        const results = yield models.MediaDoc.findAndCount(query);
        this.status = 200;
        this.body = {
            success: true,
            count: results.count,
            payload: results.rows.map(r=> {
                delete r.storedFileName;
                return r;
            })
        }
        ;
        yield next;
    }
    ,
    get: function*(next) {

        const result = yield models.MediaDoc.findById(parseInt(this.params.id));

        this.status = 200;
        this.body = {
            success: true,
            payload: result
        };
        yield next;
    }
    ,
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
            const inst = yield models.MediaDoc.create({
                originalFileName: originalFileName,
                storedFileName: meta.storedFileName,
                fileSize: meta.fileSize
            });
            const result = {};
            result[originalFileName] = inst.toJSON();
            body.payload.push(result);
        }
        this.status = 200;
        this.body = body;
        yield next;

    },
    put: function*(next) {
        const id = parseInt(this.params.id);
        let inst = yield models.MediaDoc.findById(id);
        if (!inst) {
            this.status = 404;
            this.body = {success: false, message: 'invalid id'};
            yield next;
            return;
        }

        let params = {};
        try {
            params = yield parse.form(this);
        } catch (e) {
        }

        const values = Object.assign(params, {id: id});
        const files = this.request.files;
        if (files) {
            // todo: add history record for this file
            const firstMeta = files[Object.keys(files)[0]];
            Object.assign(values, firstMeta);
        }
        let results = yield inst.update(values);
        this.status = 200;
        this.body = inst.toJSON();
        yield next;
    }
    ,
    destroy: function*(next) {
        const id = parseInt(this.params.id);
        const deletedNum = yield models.MediaDoc.destroy({where: {id: id}});
        this.status = deletedNum > 0 ? 200 : 400;
        yield next;
    }
});
