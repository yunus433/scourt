module.exports = (req, res, next) => {
  res.render('admin/teams/new', {
    page: 'admin/teams/new',
    title:  'Yeni Takım',
    includes: {
      external: ["fontawesome"]
    }
  });
};
