module.exports = (req, res, next) => {
  if (req.session.error) {
    const err = req.session.error;
    if (!req.session.email) return res.redirect('/');
    const email = req.session.email;
    req.session.err = null;
    res.render("auth/register", {
      page: "auth/register",
      title: "Sign Up",
      includes: {
        external: ["fontawesome", "js"]
      },
      err,
      email
    });
  } else {
    if (!req.session.email) return res.redirect('/');
    const email = req.session.email;
    res.render("auth/register", {
      page: "auth/register",
      title: "Sign Up",
      includes: {
        external: ["fontawesome", "js"]
      },
      email
    });
  }
};
