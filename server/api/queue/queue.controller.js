/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/queue              ->  index
 * POST    /api/queue              ->  create
 * GET     /api/queue/:id          ->  show
 * PUT     /api/queue/:id          ->  upsert
 * PATCH   /api/queue/:id          ->  patch
 * DELETE  /api/queue/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Queue from './queue.model';
const fs = require('fs');
const parser = require('xml2json');


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Queues
export function index(req, res) {
  console.log(__dirname);
  fs.readFile(__dirname + '/test.nzb', function(err, data) {
    let json = parser.toJson(data);
    return res.status(200).set('Content-Type', 'application/json').send(json);
  });

  // return Queue.find().exec()
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
}

// Gets a single Queue from the DB
export function show(req, res) {
  return Queue.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Queue in the DB
export function create(req, res) {
  return Queue.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Queue in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Queue.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Queue in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Queue.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Queue from the DB
export function destroy(req, res) {
  return Queue.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
