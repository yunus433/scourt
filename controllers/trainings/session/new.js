const User = require("../../../models/user/User");

module.exports = (req, res, next) => {
  User.findOne({ _id: req.session.user._id }).exec((err, user) => {
    if (err) return res.redirect("/");

    res.render("trainings/session/new", {
      page: "trainings/session/new",
      title: "Create a New Session",
      includes: {
        external: ["fontawesome", "js"]
      },
      user
    });
  });
};
