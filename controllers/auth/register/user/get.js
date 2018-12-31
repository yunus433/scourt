module.exports = (req, res, next) => {
  req.session.destroy();
  if (req.query.err) {
    res.render("auth/user/register", {
      page: "auth/user/register",
      title: "Sign Up",
      includes: {
        external: ["fontawesome"]
      },
      err: req.query.err
    });
  } else {
    res.render("auth/user/register", {
      page: "auth/user/register",
      title: "Sign Up",
      includes: {
        external: ["fontawesome"]
      }
    });
  }
};
