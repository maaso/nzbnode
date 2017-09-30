/**
 * Queue model events
 */

'use strict';

import {EventEmitter} from 'events';
import Queue from './queue.model';
var QueueEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QueueEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Queue.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    QueueEvents.emit(event + ':' + doc._id, doc);
    QueueEvents.emit(event, doc);
  };
}

export default QueueEvents;
