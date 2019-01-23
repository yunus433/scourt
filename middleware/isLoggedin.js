const User = require('../models/user/User');

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    if (req.session.user.type == 'user') {
      User.findUser(req.session.user.email, req.session.user.password, 'user', err => {
        if (err) return res.redirect("/auth/login");

        next();
       });
    } else if (req.session.user.type == 'coach') {
      User.findUser(req.session.user.email, req.session.user.password, 'coach', err => { 
        if (err) return res.redirect("/auth/login/coach");

        next();
      });
    };
  } else {
    res.redirect('/');
  };
};
