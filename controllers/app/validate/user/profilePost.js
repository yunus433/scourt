const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  if (req.file) {

    User.findOneAndUpdate({"email": req.session.user.email, "type": "user"}, {$set: {
      profilePhoto: req.file.filename
    }}, {upsert: true})
    .exec((err) => {
      if (err) return console.log(err);
      res.redirect('/app/validate')
    });

  } else {
    return res.redirect('/app/validate/?err=1');
  }
}
