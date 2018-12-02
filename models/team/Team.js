const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  players: {
    type: Array,
    required: true
  },
  matches: {
    type: Array,
    default: []
  },
  logo: {
    type: String
  }
});

module.exports = mongoose.model('Team', TeamSchema);
