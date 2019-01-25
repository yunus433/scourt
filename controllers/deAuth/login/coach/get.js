module.exports = (req, res, next) => {
  req.session.destroy();
  if (req.query.err) {
    res.render('deAuth/coach/login', {
      page: 'deAuth/coach/login',
      title: 'Coach Login',
      err: req.query.err
    });
  } else {
    res.render('deAuth/coach/login', {
      page: 'deAuth/coach/login',
      title: 'Coach Login'
    });
  };
};
