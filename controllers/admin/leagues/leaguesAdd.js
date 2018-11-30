module.exports = (req, res, next) => {
  res.render('admin/leagues/new', {
    page: 'admin/leagues/new',
    title:  'Yeni Lig',
    includes: {
      external: ["fontawesome"]
    }
  });
};
