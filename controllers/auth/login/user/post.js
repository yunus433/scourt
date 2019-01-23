const validator = require('validator');
const User = require('../../../../models/user/User');
const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  if (req.body && req.body.email && req.body.password) {
      if (validator.isEmail(req.body.email)) {
        if (req.body.password.length >= 6) {

          User.findUser(req.body.email, req.body.password, "user", (err, user) => {
            if (err) return res.redirect('/auth/login/?err=1');

            req.session.user = user;
            return res.redirect('/app/dashboard');
          });
        } else {
          return res.redirect('/auth/login/?err=1');
        };
      } else {
        return res.redirect('/auth/login/?err=1');
      };
  } else {
    return res.redirect('/auth/login/?err=1');
  };
};
