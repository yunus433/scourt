module.exports = (req, res, next) => {
  res.render("german/help/help", {
    page: "german/help/help",
    title: "Hilfe",
    includes: {
      external: ["fontawesome", "js"]
    }
  });
}
