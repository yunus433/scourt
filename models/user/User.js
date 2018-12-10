const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hashPassword = require('./functions/hashPassword');
const verifyPassword = require('./functions/verifyPassword');

const UserSchema = new Schema({
  name: {
    type: String
  },
  profileFoto: {
    type: String,
    default: "defaultUserPicture.png"
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
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
  date: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  }
});

UserSchema.pre('save', hashPassword);

UserSchema.statics.findUser = function (email, password, callback) {
  let User = this;

  return User.findOne({email}).then((user) => {
        
    if (!user) {
        return callback(true);
    }

    verifyPassword(password, user, (err, res) => {
      if (res) {
        return callback(undefined, user);
      } else {
        return callback(err);
      }
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
