const User = require("../../../models/user/User");
const bcrypt = require("bcrypt");

module.exports = (req, res, next) => {
  if (
    req.body &&
    req.body.password &&
    req.body.oldPassword &&
    req.body.confirmPassword
  ) {
    return bcrypt.compare(req.body.oldPassword, req.session.user.password, (err, result) => {
      if (err) {
        return res.redirect('/app/edit/password/?err=2');
      } else if (!result) {
        return res.redirect('/app/edit/password/?err=2');
      } else {
        if (req.body.password == req.body.confirmPassword) {
          User.findOne({"email": req.session.user.email},
            (err, user) => {
              if (err || !user) return res.redirect('/');

              user.password = req.body.password;
              user.save((err, newUser) => {
                if (err) return res.redirect('/');

                req.session.user.password = newUser.password;
                return res.redirect('/app/dashboard');
              });
            }
          );
        } else {
          return res.redirect("/app/edit/password/?err=3");
        }
      }
    });
  } else {
    return res.redirect("/app/edit/password/?err=1");
  }
};
