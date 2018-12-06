const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
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
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Girdiğiniz e-mail uygun değil'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  teams: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('User', UserSchema);
