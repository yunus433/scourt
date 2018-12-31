module.exports = (req, res, next) => {
  req.session.destroy();
  if (req.query.err) {
    res.render('auth/coach/login', {
      page: 'auth/coach/login',
      title: 'Coach Login',
      err: req.query.err
    });
  } else {
    res.render('auth/coach/login', {
      page: 'auth/coach/login',
      title: 'Coach Login'
    });
  };
};
