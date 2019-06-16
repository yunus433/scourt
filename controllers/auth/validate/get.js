const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  User
    .findOne({email: req.session.user.email}, (err, user) => {
      if (err) res.redirect('/');

      if (req.session.error) {
        const err = req.session.error;
        req.session.error = undefined;
        res.render('auth/validate', {
          page: 'auth/validate',
          title: 'Verify Your Account',
          includes: {
            external: ["js"]       
          },
          user,
          err 
        });
      } else {
        res.render('auth/validate', {
          page: 'auth/validate',
          title: 'Verify Your Account',
          includes: {
            external: ["js"]       
          },
          user
        });
      };
    });
};
