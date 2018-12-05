const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MatchSchema = new Schema({
  teamOne: {
    type: Object,
    required: true
  },
  teamTwo: {
    type: Object,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  league: {
    type: Object,
    default: '-'
  },
  date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Match', MatchSchema);
