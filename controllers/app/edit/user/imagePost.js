const User = require("../../../../models/user/User");

module.exports = (req, res, next) => {
  if (req.file) {
    User.findUser(req.session.user.email, req.session.user.password, err => {
      if (err) return res.redirect("/auth/login");

      User.findOneAndUpdate(
        { email: req.session.user.email },
        {
          $set: {
            profileFoto: req.file.filename
          }
        },
        { upsert: true }
      ).exec(err => {
        if (err) return console.log(err);
        res.redirect("/app/edit");
      });
    });
  } else {
    return res.redirect("/app/edit");
  }
};
