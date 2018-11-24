module.exports = (req, res, next) => {
  res.render('admin/players/new', {
    page: 'admin/players/new',
    title:  'Yeni Oyuncu',
    includes: {
      external: ["fontawesome"]
    }
  });
};
