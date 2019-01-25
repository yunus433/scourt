module.exports = (req, res, next) => {
  req.session.destroy();
  if (req.query.err) {
    res.render("deAuth/user/register", {
      page: "deAuth/user/register",
      title: "Sign Up",
      includes: {
        external: ["fontawesome"]
      },
      err: req.query.err
    });
  } else {
    res.render("deAuth/user/register", {
      page: "deAuth/user/register",
      title: "Sign Up",
      includes: {
        external: ["fontawesome"]
      }
    });
  }
};
