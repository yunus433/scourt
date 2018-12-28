const User = require('../../../../models/user/User');
const validator = require('validator');
const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
  if (req.body && req.body.email && req.body.password) {
      if (validator.isEmail(req.body.email)) {
        if (req.body.password.length >= 6) {
          User.findOne({"email": req.body.email}, (err, user) => {
            if (err) return res.redirect('/auth/login/?err=1');

            bcrypt.compare(req.body.password, user.password, (err, result) => {
              if (err) return res.redirect('/auth/login=1');

              req.session.user = user;
              if (user.completed) {
                return res.redirect('/app/dashboard');
              } else {
                return res.redirect('/app/validate');
              }
            });
          });
        } else {
          return res.redirect('/auth/login/?err=1');
        }
      } else {
        return res.redirect('/auth/login/?err=1');
      }
  } else {
    return res.redirect('/auth/login/?err=1');
  }
}
