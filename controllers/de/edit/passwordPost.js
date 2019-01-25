const User = require("../../../models/user/User");
const bcrypt = require("bcrypt");

module.exports = (req, res, next) => {
  if (
    req.body &&
    req.body.password &&
    req.body.oldPassword &&
    req.body.confirmPassword
  ) {
    if (bcrypt.compare(req.body.oldPassword, req.session.user.password)) {
      if (req.body.password == req.body.confirmPassword) {
        User.findOne({"email": req.session.user.email},
          (err, user) => {
            if (err || !user) return res.redirect("/de");

            user.password = req.body.password;
            user.save((err, newUser) => {
              if (err) return res.redirect('/de');

              req.session.user.password = newUser.password;
              res.redirect("/de/dashboard");
            }); 
          }
        );
      } else {
        return res.redirect("/de/edit");
      }
    } else {
      return res.redirect("/de/edit");
    }
  } else {
    return res.redirect("/de/edit");
  }
};
