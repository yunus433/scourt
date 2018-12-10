module.exports = (req, res, next) => {
  if (req.query.err) {
    res.render('app/auth/login', {
      page: 'app/auth/login',
      title: 'Login',
      includes: {
        external: ["fontawesome"]       
      },
      err: req.query.err
    });
  } else {
    res.render('app/auth/login', {
      page: 'app/auth/login',
      title: 'Login',
      includes: {
        external: ["fontawesome"]       
      }
    });
  }
}
