const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  gol: {
    type: Number,
    default: 0
  },
  asist: {
    type: Number,
    default: 0
  },
  pozisyon: {
    type: String
  },
  position: {
    type: String
  },
  positionGerman: {
    type: String
  },
  boy: {
    type: Number,
    default: undefined
  },
  kilo: {
    type: Number,
    default: undefined
  },
  ayak: {
    type: String,
    default: '-'
  },
  profile: {
    type: String,
    default: '-'
  }
});


module.exports = mongoose.model('Player', PlayerSchema)
