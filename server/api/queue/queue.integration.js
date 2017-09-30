'use strict';

var app = require('../..');
import request from 'supertest';

var newQueue;

describe('Queue API:', function() {
  describe('GET /api/queue', function() {
    var queues;

    beforeEach(function(done) {
      request(app)
        .get('/api/queue')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          queues = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      queues.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/queue', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/queue')
        .send({
          name: 'New Queue',
          info: 'This is the brand new queue!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newQueue = res.body;
          done();
        });
    });

    it('should respond with the newly created queue', function() {
      newQueue.name.should.equal('New Queue');
      newQueue.info.should.equal('This is the brand new queue!!!');
    });
  });

  describe('GET /api/queue/:id', function() {
    var queue;

    beforeEach(function(done) {
      request(app)
        .get(`/api/queue/${newQueue._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          queue = res.body;
          done();
        });
    });

    afterEach(function() {
      queue = {};
    });

    it('should respond with the requested queue', function() {
      queue.name.should.equal('New Queue');
      queue.info.should.equal('This is the brand new queue!!!');
    });
  });

  describe('PUT /api/queue/:id', function() {
    var updatedQueue;

    beforeEach(function(done) {
      request(app)
        .put(`/api/queue/${newQueue._id}`)
        .send({
          name: 'Updated Queue',
          info: 'This is the updated queue!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedQueue = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQueue = {};
    });

    it('should respond with the updated queue', function() {
      updatedQueue.name.should.equal('Updated Queue');
      updatedQueue.info.should.equal('This is the updated queue!!!');
    });

    it('should respond with the updated queue on a subsequent GET', function(done) {
      request(app)
        .get(`/api/queue/${newQueue._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let queue = res.body;

          queue.name.should.equal('Updated Queue');
          queue.info.should.equal('This is the updated queue!!!');

          done();
        });
    });
  });

  describe('PATCH /api/queue/:id', function() {
    var patchedQueue;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/queue/${newQueue._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Queue' },
          { op: 'replace', path: '/info', value: 'This is the patched queue!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedQueue = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedQueue = {};
    });

    it('should respond with the patched queue', function() {
      patchedQueue.name.should.equal('Patched Queue');
      patchedQueue.info.should.equal('This is the patched queue!!!');
    });
  });

  describe('DELETE /api/queue/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/queue/${newQueue._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when queue does not exist', function(done) {
      request(app)
        .delete(`/api/queue/${newQueue._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
