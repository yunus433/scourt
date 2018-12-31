const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  if (req.body && req.body.name && req.body.date) {

    User.findOneAndUpdate({"email": req.session.user.email, "type": "user"}, {$set: {
      name: req.body.name,
      date: req.body.date,
      phone: req.body.phone || undefined,
      completed: true
    }}, {upsert: true})
    .exec(err => {
      if (err) return res.redirect('/');
      res.redirect('/app/dashboard')
    });

  } else {
    return res.redirect('/app/validate/?err=1');
  }
}
