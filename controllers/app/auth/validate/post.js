const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  if (req.body && req.body.name && req.body.date) {

    User.findUser(req.session.user.email, req.session.user.password, (err, user) => {
      if (err) return res.redirect('/login');

      if (req.file) {
        User.findOneAndUpdate({"email": req.session.user.email}, {$set: {
          name: req.body.name,
          date: req.body.date,
          phoneNumber: req.body.phone || undefined,
          completed: true,
          profileFoto: req.file.filename
        }}, {upsert: true})
        .exec((err) => {
          if (err) return console.log(err);
          res.redirect('/dashboard')
        });
      } else {
        User.findOneAndUpdate({"email": req.session.user.email}, {$set: {
          name: req.body.name,
          date: req.body.date,
          phoneNumber: req.body.phone || undefined,
          completed: true
        }}, {upsert: true})
        .exec((err) => {
          if (err) return console.log(err);
          res.redirect('/dashboard')
        });
      }

    });

  } else {
    return res.redirect('/register/?err=1');
  }
}
