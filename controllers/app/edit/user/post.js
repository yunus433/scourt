const User = require("../../../../models/user/User");

module.exports = (req, res, next) => {
  if (req.body && req.body.name && req.body.date) {
    User.findOneAndUpdate(
      { email: req.session.user.email },
      {
        $set: {
          name: req.body.name,
          date: req.body.date,
          phone: req.body.phone || undefined
        }
      },
      { upsert: true }
    ).exec(err => {
      if (err) return console.log(err);
      res.redirect("/app/dashboard");
    });
  };
};
