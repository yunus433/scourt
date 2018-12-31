module.exports = (req, res, next) => {
  res.render('index', {
    page: 'index',
    title: 'App',
    includes: {
      external: ["fontawesome"]       
    }
  });
};
