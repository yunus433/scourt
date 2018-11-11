module.exports = (req, res, next) => {
  res.render("help/help", {
    page: "help/help",
    title: "İletişim",
    includes: {
      external: ["fontawesome", "js-header"]
    }
  });
}
