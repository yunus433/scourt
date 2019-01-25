const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  User.findById(req.session.user._id, (err, user) => {
    if (err) return res.redirect('/');

    res.render('de/edit', {
      page: 'de/edit',
      title: 'Edit Your Account',
      includes: {
        external: ["fontawesome", "js"]       
      },
      user,
      err: req.query.err
    });
  });
};
