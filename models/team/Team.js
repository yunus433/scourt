const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const TeamSchema = new Schema({
  name: {
    type: String
  },
  profilePhoto: {
    type: String,
    default: "/res/images/defaultTeamPicture.png"
  },
  teamId: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    default: '-'
  },
  createdAt: {
    type: String,
    default: moment(Date.now()).format("dddd, MMMM Do YYYY")
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
  events: {
    type: Array,
    default: []
  },
  videos: {
    type: Array,
    default: []
  },
  trainings: {
    type: Array, 
    default: []
  },
  trainingModels: {
    type: Array,
    default: []
  },
  tacticBoard: {
    type: Object,
    default: {
      lineDatas: [],
      playerDatas: [],
      noteDatas: []
    }
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
