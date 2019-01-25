module.exports = (req, res, next) => {
  res.render('de/index', {
    page: 'de/index',
    title: 'App',
    includes: {
      external: ["fontawesome"]       
    }
  });
}
