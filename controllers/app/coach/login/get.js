module.exports = (req, res, next) => {
  if (req.query.err) {
    res.render('app/coach/login', {
      page: 'app/coach/login',
      title: 'Coach Login',
      includes: {
        external: ["fontawesome"]       
      },
      err: req.query.err
    });
  } else {
    res.render('app/coach/login', {
      page: 'app/coach/login',
      title: 'Coach Login',
      includes: {
        external: ["fontawesome"]       
      }
    });
  };
};
