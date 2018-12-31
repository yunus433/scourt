const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {

  User
    .findOneAndUpdate({email: req.session.user.email}, {$set: {
      profilePhoto: req.file.filename
    }}, {upsert: true})
    .exec(err => {
      if (err) return res.redirect('/');

      res.redirect('/app/validate/coach');
    });
};
