const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  if (req.body && req.body.email && req.body.password) {
    if (req.body.password.length >= 6) {
      User.findUser(req.body.email, req.body.password, (err, user) => {
        if (err || !user) {
          req.session.error = 'not valid';
          return res.redirect('/auth/login');
        }

        req.session.user = user;
        return res.redirect('/dashboard');
      });    
    } else {
      req.session.error = 'not valid';
      return res.redirect('/auth/login');
    };
  } else {
    req.session.error = 'no input';
    return res.redirect('/auth/login');
  };
};
