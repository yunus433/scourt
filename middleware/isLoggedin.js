module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next()
  } else if (req.session && req.session.coach) {
    next();
  } else {
    res.redirect('/');
  }
}
