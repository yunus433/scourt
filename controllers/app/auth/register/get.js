module.exports = (req, res, next) => {
  if (req.query.err) {
    res.render('app/auth/register', {
      page: 'app/auth/register',
      title: 'Sign Up',
      includes: {
        external: ["fontawesome"]       
      },
      err: req.query.err
    });
  } else {
    res.render('app/auth/register', {
      page: 'app/auth/register',
      title: 'Sign Up',
      includes: {
        external: ["fontawesome"]       
      }
    });
  }
}
