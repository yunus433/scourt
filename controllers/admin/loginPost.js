module.exports = (req, res, next) => {
  if (req.body) {
    if (req.body.password) {
      if (req.body.password == process.env.ADMIN_PASSWORD) {
        req.session.admin = true;
        req.session.wrongLogin = false;
        res.redirect('/admin/main');
      } else {
        req.session.wrongLogin = true;
        res.redirect('/admin/login');
      }
    } else {
      req.session.wrongLogin = true;
      res.redirect('/admin/login'); 
    }
  } else {
    req.session.wrongLogin = true;
    res.redirect('/admin/login'); 
  }
};
