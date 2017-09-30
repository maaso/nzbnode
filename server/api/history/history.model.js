'use strict';

import mongoose from 'mongoose';

var HistorySchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('History', HistorySchema);
