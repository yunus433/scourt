module.exports = (req, res, next) => {
  if (req.session.wrongLogin) {
    res.render("admin/login", {
      page: "admin/login",
      wrong: true,
      title: "Admin Girişi"
    });
  } else {
    res.render("admin/login", {
      page: "admin/login",
      wrong: false,
      title: "Admin Girişi"
    });
  }
  
}
