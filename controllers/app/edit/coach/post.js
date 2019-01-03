const User = require("../../../../models/user/User");

module.exports = (req, res, next) => {
  if (req.body && req.body.name) {
    User.findOneAndUpdate(
      { email: req.session.user.email },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone || undefined
        }
      },
      { upsert: true }
    ).exec(err => {
      if (err && err.code == 11000) {
        return res.redirect('/app/edit/coach/?err=2');
      }
      if (err) return res.redirect('/');
      res.redirect("/app/dashboard/coach");
    });
  } else {
    return res.redirect('/app/edit/coach/?err=1')
  }
};
