module.exports = (req, res, next) => {
  res.render("index/help/help", {
    page: "index/help/help",
    title: "İletişim",
    includes: {
      external: ["fontawesome", "js"]
    }
  });
}
