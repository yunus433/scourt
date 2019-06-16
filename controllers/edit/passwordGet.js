const User = require('../../models/user/User');

module.exports = (req, res, next) => {
  User.findById(req.session.user._id, (err, user) => {
    if (err) return res.redirect('/');

    if (req.session && req.session.error) {
      req.session.error = null;
      
      res.render('edit/password', {
        page: 'edit/password',
        title: 'Edit Your Password',
        includes: {
          external: ['fontawesome', 'js']       
        },
        user,
        err: true
      });
    } else {
      res.render('edit/password', {
        page: 'edit/password',
        title: 'Edit Your Password',
        includes: {
          external: ['fontawesome', 'js']       
        },
        user
      });
    };
  });
};
