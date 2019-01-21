const User = require("../../../../models/user/User");

module.exports = (req, res, next) => {
  if (req.body && req.body.name && req.body.date) {
    User.findOneAndUpdate(
      { email: req.session.user.email },
      {
        $set: {
          name: req.body.name,
          date: req.body.date,
          email: req.body.email,
          phone: req.body.phone || undefined
        }
      },
      { upsert: true }
    ).exec(err => {
      if (err && err.code == 11000) {
        res.redirect("/app/edit/?err=2");
      }
      if (err) return res.redirect('/');
      res.redirect("/app/dashboard");
    });
  };
};
