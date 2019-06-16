const User = require("../../../models/user/User");
const validator = require("validator");
const sendMail = require("../../../utils/sendMail");

module.exports = (req, res, next) => {
  if (req.session.user.type == "user") {
    User.findOneAndUpdate(
      { email: req.session.user.email },
      {
        $set: {
          name: req.body.name,
          surname: req.body.surname,
          date: req.body.date,
          phone: req.body.phone || undefined,
          completed: true
        }
      },
      { upsert: true }
    ).exec(err => {
      if (err) return res.redirect("/");
      return res.redirect("/auth/validate/profile");
    });
  } else {
    if (validator.isEmail(req.body.email)) {
      User.findOne({ email: req.session.user.email }, (err, coach) => {
        if (err) res.redirect("/");
        coach.name = req.body.name,
        coach.surname = req.body.surname,
        coach.email = req.body.email,
        coach.password = req.body.password;
        coach.completed = true;

        coach.save(err => {
          if (err && err.code == 11000) {
            req.session.error = 'already taken email';
            return res.redirect("/auth/validate");
          } else {
            if (err) return res.redirect("/");

            sendMail(
              {
                email: coach.email
              },
              "coachRegister",
              (err, user) => {
                if (err) return res.redirect("/");
                req.session.user = user;

                return res.redirect("/auth/validate/profile");
              }
            );
          }
        });
      });
    } else {
      req.session.error = "not valid email";
      return res.redirect("/auth/validate/profile");
    }
  }
};
