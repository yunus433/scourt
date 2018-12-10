const User = require('../../../../models/user/User');
const validator = require('validator');

module.exports = (req, res, next) => {
  if (req.body && req.body.email && req.body.password) {
      if (validator.isEmail(req.body.email)) {
        if (req.body.password.length >= 6) {
          User.findUser(req.body.email, req.body.password, (err, user) => {
            if (err) return res.redirect('/login/?err=1');

            req.session.user = user;
            if (user.completed) {
              return res.redirect('/dashboard');
            } else {
              return res.redirect('/validate');
            }
          });
        } else {
          return res.redirect('/login/?err=1');
        }
      } else {
        return res.redirect('/login/?err=1');
      }
  } else {
    return res.redirect('/login/?err=1');
  }
}
