const User = require("../../models/user/User");
const validator = require('validator');

module.exports = (req, res, next) => {
  User.find({"email": req.body.email}, (err, user) => {
    if (!validator.isEmail(req.body.email)) {
      req.session.error = "email not valid"; 
      return res.redirect('/');
    }

    if (err || user.length > 0) {
      req.session.error = "user has found"; 
      return res.redirect('/');
    }

    req.session.email = req.body.email;
    res.redirect('/auth/register');
  });
};
