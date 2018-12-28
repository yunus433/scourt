const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const TeamSchema = new Schema({
  name: {
    type: String
  },
  teamPhoto: {
    type: String,
    default: "defaultTeamPicture.png"
  },
  teamId: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  creator: {
    type: Object,
    required: true
  },
  players: {
    type: Array,
    default: []
  },
  messages: {
    type: Array,
    default: []
  },
  description: {
    type: String,
    default: '-'
  },
  createdAt: {
    type: String,
    default: moment(Date.now()).format("dddd, MMMM Do YYYY")
  }
});

TeamSchema.statics.findTeam = function (teamId, callback) {
  let Team = this;

  return Team.findOne({teamId}).then((team) => {
        
    if (!team) {
        return callback(true);
    }

    return callback(undefined, team);
  });
};

module.exports = mongoose.model('Team', TeamSchema);
