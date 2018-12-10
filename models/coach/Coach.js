const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hashPassword = require('./functions/hashPassword');
const verifyPassword = require('./functions/verifyPassword');

const CoachSchema = new Schema({
  name: {
    type: String
  },
  profileFoto: {
    type: String,
    default: "defaultCoachPicture.jpg"
  },
  coachId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    minlength: 1,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  teams: {
    type: Array,
    default: []
  },
  phone: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  }
});

CoachSchema.pre('save', hashPassword);

CoachSchema.statics.findCoach = function (id, password, callback) {
  let Coach = this;

  return Coach.findOne({"coachId": id}).then((coach) => {
        
    if (!coach) {
        return callback(true);
    }

    verifyPassword(password, coach, (err, res) => {
      if (res) {
        return callback(undefined, coach);
      } else {
        return callback(err);
      }
    });
  });
};

module.exports = mongoose.model('Coach', CoachSchema);
