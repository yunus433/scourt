module.exports = (req, res, next) => {

  if (req.query.err) {
    res.render('app/coach/validate', {
      page: 'app/coach/validate',
      title: 'Verify Your Account',
      includes: {
        external: ["fontawesome"]       
      },
      coach: req.session.coach,
      err: req.query.err 
    });
  } else {
    res.render('app/coach/validate', {
      page: 'app/coach/validate',
      title: 'Verify Your Account',
      includes: {
        external: ["fontawesome"]       
      },
      coach: req.session.coach
    });
  };
};
