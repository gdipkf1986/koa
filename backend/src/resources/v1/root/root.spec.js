'use strict';

const app = require('../../../server');
const request = require('supertest').agent(app.listen());

const expect = require('chai').expect;
const should = require('should');

describe('GET /api/v1', function() {
    it('should respond with 200', function(done) {
        request
            .get('/api/v1')
            .expect(403, done);
    });
});
