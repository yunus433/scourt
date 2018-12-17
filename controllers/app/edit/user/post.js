const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  if (req.body && req.body.name && req.body.date) {

    User.findUser(req.session.user.email, req.session.user.password, (err, user) => {
      if (err) return res.redirect('/auth/login');

      if (req.file) {
        User.findOneAndUpdate({"email": req.session.user.email}, {$set: {
          name: req.body.name,
          date: req.body.date,
          phone: req.body.phone || undefined,
          profileFoto: req.file.filename
        }}, {upsert: true})
        .exec((err) => {
          if (err) return console.log(err);
          res.redirect('/app/dashboard')
        });
      } else {
        User.findOneAndUpdate({"email": req.session.user.email}, {$set: {
          name: req.body.name,
          date: req.body.date,
          phone: req.body.phone || undefined,
        }}, {upsert: true})
        .exec((err) => {
          if (err) return console.log(err);
          res.redirect('/app/dashboard')
        });
      }

    });
  } else {
    return res.redirect('/app/edit/?err=1');
  }
}