module.exports = (req, res, next) => {
  if (req.session && req.session.admin) {
    req.session.destroy();
    res.redirect('/admin/login');
  } else {
    res.redirect('/admin/login');
  }
};
