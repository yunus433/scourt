module.exports = (req, res, next) => {
  if (req.session.error) {
    const err = req.session.error;
    req.session.error = null;
    res.render('index/index', {
      page: 'index/index',
      title: 'App',
      includes: {
        external: ["js"]
      },
      err
    });

  } else {
    res.render('index/index', {
      page: 'index/index',
      title: 'App',
      includes: {
        external: ["js"]       
      }
    });
  }
};
