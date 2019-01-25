module.exports = (req, res, next) => {
  req.session.destroy();
  if (req.query.err) {
    res.render('deAuth/user/login', {
      page: 'deAuth/user/login',
      title: 'Login',
      err: req.query.err
    });
  } else {
    res.render('deAuth/user/login', {
      page: 'deAuth/user/login',
      title: 'Login'
    });
  };
};
