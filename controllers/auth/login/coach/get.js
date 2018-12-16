module.exports = (req, res, next) => {
  req.session.destroy();
  if (req.query.err) {
    res.render('auth/coachLogin', {
      page: 'auth/coachLogin',
      title: 'Coach Login',
      includes: {
        external: ["fontawesome"]       
      },
      err: req.query.err
    });
  } else {
    res.render('auth/coachLogin', {
      page: 'auth/coachLogin',
      title: 'Coach Login',
      includes: {
        external: ["fontawesome"]       
      }
    });
  };
};
