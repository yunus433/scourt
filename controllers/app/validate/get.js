module.exports = (req, res, next) => {
  if (req.query.err) {
    res.render('app/validate/user', {
      page: 'app/validate/user',
      title: 'Verify Your Account',
      includes: {
        external: ["fontawesome"]       
      },
      user: req.session.user,
      err: req.query.err 
    });
  } else {
    res.render('app/validate/user', {
      page: 'app/validate/user',
      title: 'Verify Your Account',
      includes: {
        external: ["fontawesome"]       
      },
      user: req.session.user
    });
  };
};
