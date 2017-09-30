'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var queueCtrlStub = {
  index: 'queueCtrl.index',
  show: 'queueCtrl.show',
  create: 'queueCtrl.create',
  upsert: 'queueCtrl.upsert',
  patch: 'queueCtrl.patch',
  destroy: 'queueCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var queueIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './queue.controller': queueCtrlStub
});

describe('Queue API Router:', function() {
  it('should return an express router instance', function() {
    queueIndex.should.equal(routerStub);
  });

  describe('GET /api/queue', function() {
    it('should route to queue.controller.index', function() {
      routerStub.get
        .withArgs('/', 'queueCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/queue/:id', function() {
    it('should route to queue.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'queueCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/queue', function() {
    it('should route to queue.controller.create', function() {
      routerStub.post
        .withArgs('/', 'queueCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/queue/:id', function() {
    it('should route to queue.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'queueCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/queue/:id', function() {
    it('should route to queue.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'queueCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/queue/:id', function() {
    it('should route to queue.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'queueCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
