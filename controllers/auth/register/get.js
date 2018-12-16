module.exports = (req, res, next) => {
  req.session.destroy();
  if (req.query.err) {
    res.render('auth/register', {
      page: 'auth/register',
      title: 'Sign Up',
      includes: {
        external: ["fontawesome"]       
      },
      err: req.query.err
    });
  } else {
    res.render('auth/register', {
      page: 'auth/register',
      title: 'Sign Up',
      includes: {
        external: ["fontawesome"]       
      }
    });
  }
}
