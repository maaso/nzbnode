'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var historyCtrlStub = {
  index: 'historyCtrl.index',
  show: 'historyCtrl.show',
  create: 'historyCtrl.create',
  upsert: 'historyCtrl.upsert',
  patch: 'historyCtrl.patch',
  destroy: 'historyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var historyIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './history.controller': historyCtrlStub
});

describe('History API Router:', function() {
  it('should return an express router instance', function() {
    historyIndex.should.equal(routerStub);
  });

  describe('GET /api/history', function() {
    it('should route to history.controller.index', function() {
      routerStub.get
        .withArgs('/', 'historyCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/history/:id', function() {
    it('should route to history.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'historyCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/history', function() {
    it('should route to history.controller.create', function() {
      routerStub.post
        .withArgs('/', 'historyCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/history/:id', function() {
    it('should route to history.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'historyCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/history/:id', function() {
    it('should route to history.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'historyCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/history/:id', function() {
    it('should route to history.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'historyCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
