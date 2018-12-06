module.exports = (req, res, next) => {
  res.render('index/auth/register', {
    page: 'index/auth/register',
    title: 'Kayıt Ol',
    includes: {
      external: ["fontawesome"]       
    }
  });
}
