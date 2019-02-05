const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  User.findById(req.session.user._id, (err, user) => {
    if (err) return res.redirect('/');

    res.render('app/editPassword', {
      page: 'app/editPassword',
      title: 'Edit Your Password',
      includes: {
        external: ["fontawesome"]       
      },
      user,
      err: req.query.err
    });
  });
};
