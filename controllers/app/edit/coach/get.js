const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  let user = req.session.user;
  User.findById(user._id, (err, user) => {
    if (err) return res.redirect('/');

    res.render('app/edit/coach', {
      page: 'app/edit/coach',
      title: 'Edit Your Account',
      includes: {
        external: ["fontawesome", "js"]       
      },
      user,
      err: req.query.err
    });
  });
};
