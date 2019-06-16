const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  User
    .findOne({email: req.session.user.email}, (err, user) => {
      if (err) res.redirect('/');

      res.render('auth/validate/profile', {
        page: 'auth/validate/profile',
        title: 'Profile Picture',
        includes: {
          external: ["js"]       
        },
        user
      });
    });
};
