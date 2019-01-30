const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  User
    .findOne({email: req.session.user.email}, (err, user) => {
      if (err) res.redirect('/');

      if (req.query.err) {
        res.render('app/validate', {
          page: 'app/validate',
          title: 'Verify Your Account',
          user,
          err: req.query.err 
        });
      } else {
        res.render('app/validate', {
          page: 'app/validate',
          title: 'Verify Your Account',
          includes: {
            external: ["js"]       
          },
          user
        });
      };
    });
};