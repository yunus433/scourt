const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: {
    type: Object,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date, 
    default: Date.now
  },
  team: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model('Message', MessageSchema);
