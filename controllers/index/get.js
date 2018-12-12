module.exports = (req, res, next) => {
  res.render('app/index', {
    page: 'app/index',
    title: 'App',
    includes: {
      external: ["fontawesome"]       
    }
  });
};
