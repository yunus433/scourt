const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hashPassword = require('./functions/hashPassword');
const verifyPassword = require('./functions/verifyPassword');

const CoachSchema = new Schema({
  name: {
    type: String,
    default: "-"
  },
  profileFoto: {
    type: String,
    default: "defaultCoachPicture.jpg"
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
  team: {
    type: Object
  },
  phone: {
    type: String,
    default: "-"
  },
  completed: {
    type: Boolean,
    default: false
  }
});

CoachSchema.pre('save', hashPassword);

CoachSchema.statics.findCoach = function (email, password, callback) {
  let Coach = this;

  return Coach.findOne({email: email}).then((coach) => {

    if (!coach) {
        return callback(true);
    }

    verifyPassword(password, coach, (err, res) => {
      if (res) {
        return callback(undefined, coach);
      } else {
        return callback(true);
      }
    });
  });
};

module.exports = mongoose.model('Coach', CoachSchema);
