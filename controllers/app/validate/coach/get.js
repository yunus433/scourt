const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  User.findOne({email: req.session.user.email}, (err, coach) => {
    if (err) res.redirect('/');

    if (req.query.err) {
      res.render('app/validate/coach', {
        page: 'app/validate/coach',
        title: 'Verify Your Account',
        includes: {
          external: ["js"]       
        },
        coach,
        err: req.query.err 
      });
    } else {
      res.render('app/validate/coach', {
        page: 'app/validate/coach',
        title: 'Verify Your Account',
        includes: {
          external: ["js"]       
        },
        coach
      });
    };
  });
};
