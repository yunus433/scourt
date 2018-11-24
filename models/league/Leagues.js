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
  matches: {
    type: Array
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('League', LeagueSchema);
