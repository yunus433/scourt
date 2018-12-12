module.exports = (req, res, next) => {
  res.render("admin/main", {
    page: "admin/main",
    title: "Admin Sayfası",
    includes: {
      external: ["fontawesome", "js"]
    }
  });
}
