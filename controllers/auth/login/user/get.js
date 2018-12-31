module.exports = (req, res, next) => {
  req.session.destroy();
  if (req.query.err) {
    res.render('auth/user/login', {
      page: 'auth/user/login',
      title: 'Login',
      err: req.query.err
    });
  } else {
    res.render('auth/user/login', {
      page: 'auth/user/login',
      title: 'Login'
    });
  };
};
