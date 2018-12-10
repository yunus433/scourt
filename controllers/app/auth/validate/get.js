const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  if (req.session.user) {
    res.render('app/auth/validate', {
      page: 'app/auth/validate',
      title: 'Verify Your Account',
      includes: {
        external: ["fontawesome"]       
      },
      user: req.session.user
    });
  } else {
    res.redirect('/');
  }
}
