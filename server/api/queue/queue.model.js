'use strict';

import mongoose from 'mongoose';

var QueueSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Queue', QueueSchema);
