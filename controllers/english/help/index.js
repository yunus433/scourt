module.exports = (req, res, next) => {
  res.render("english/help/help", {
    page: "english/help/help",
    title: "Help",
    includes: {
      external: ["fontawesome", "js"]
    }
  });
}
