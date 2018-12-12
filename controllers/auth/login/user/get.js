module.exports = (req, res, next) => {
  if (req.query.err) {
    res.render('auth/login', {
      page: 'auth/login',
      title: 'Login',
      includes: {
        external: ["fontawesome"]       
      },
      err: req.query.err
    });
  } else {
    res.render('auth/login', {
      page: 'auth/login',
      title: 'Login',
      includes: {
        external: ["fontawesome"]       
      }
    });
  }
}
