const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeagueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  teams: {
    type: Array,
    default: []
  },
  matches: {
    type: Array,
    default: []
  },
  status: {
    type: String,
    required: true
  },
  videos: {
    type: Array
  }
});

module.exports = mongoose.model('League', LeagueSchema);
