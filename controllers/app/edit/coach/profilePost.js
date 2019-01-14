const fs = require('fs');
const User = require("../../../../models/user/User");

module.exports = (req, res, next) => {
  if (req.file) {
    User.findUser(req.session.user.email, req.session.user.password, 'coach', err => {
      if (err) return res.redirect("/auth/login/coach");

      User.findOneAndUpdate(
        { email: req.session.user.email },
        {
          $set: {
            profilePhoto: req.file.filename
          }
        },
        { upsert: true }
      ).exec((err, user) => {
        if (err) return res.redirect('/');
        
        fs.unlink("./public/res/uploads/" + user.profilePhoto, err => {
          if (err) return res.redirect('/');

          res.redirect("/app/edit/coach");
        });
      });
    });
  } else {
    return res.redirect("/app/edit/coach");
  }
};
