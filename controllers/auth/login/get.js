module.exports = (req, res, next) => {
  if (req.session.error) {
    const err = req.session.error;
    req.session.destroy();
    res.render('auth/login', {
      page: 'auth/login',
      title: 'Login',
      includes: {
        external: ["fontawesome", "js"]
      },
      err
    });
  } else {
    res.render('auth/login', {
      page: 'auth/login',
      title: 'Login',
      includes: {
        external: ["fontawesome", "js"]
      }
    });
  };
};
