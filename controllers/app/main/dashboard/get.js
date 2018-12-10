const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  if (req.session.user) {
    User
      .findOne({email: req.session.user.email})
      .then(
        (user) => {
          res.render('app/main/dashboard', {
            page: 'app/main/dashboard',
            title: 'Main Page',
            includes: {
              external: ["fontawesome"]       
            },
            user
          });
        }
      )
  } else {
    res.redirect('/');
  }
}
