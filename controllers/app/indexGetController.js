module.exports = (req, res, next) => {
  req.session.destroy();
  res.render('app/index', {
    page: 'app/index',
    title: 'App',
    includes: {
      external: ["fontawesome"]       
    }
  });
}
