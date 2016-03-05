'use strict';

const app = require('../../../server');
const request = require('supertest').agent(app.listen());

const expect = require('chai').expect;
const should = require('should');

describe('GET /api/v1/mediaDocs', function() {
    it('should respond with 200 type Array', function(done) {
        request
            .get('/api/v1/mediaDocs')
            .expect(200, function(err, res) {
                expect(Array.isArray(res.body.payload.MediaDoc)).to.be.true;
                done();
            });
    });
});

describe('Delete /api/v1/mediaDocs/', function() {
    it('should forbidden without authorised role', function(done) {
        request
            .delete('/api/v1/mediaDocs/any-resource-name')
            .expect(401, done);
    });
});
