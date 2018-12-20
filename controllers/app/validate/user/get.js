const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  User
    .findOne({"email": req.session.user.email})
    .exec((err, user) => {
      if (err) return res.redirect('/');

      if (req.query.err) {
        res.render('app/validate/user', {
          page: 'app/validate/user',
          title: 'Verify Your Account',
          includes: {
            external: ["fontawesome"]       
          },
          user,
          err: req.query.err 
        });
      } else {
        res.render('app/validate/user', {
          page: 'app/validate/user',
          title: 'Verify Your Account',
          includes: {
            external: ["fontawesome", "js"]       
          },
          user
        });
      };
    });
};
