const Coach = require("../../../../models/coach/Coach");
const Team = require("../../../../models/team/Team");

module.exports = (req, res, next) => {
  if (req.session.coach) {
    Coach.findOne({ email: req.session.coach.email }).then(coach => {
      Team.findOne({ creator: { _id: req.session.coach._id.toString() } }).exec(
        (err, team) => {
          if (err) return res.redirect("/");

          if (team) {
            return res.render("app/coach/dashboard", {
              page: "app/coach/dashboard",
              title: "Coach Page",
              includes: {
                external: ["fontawesome", "js"]
              },
              coach,
              team
            });
          } else {
            res.render("app/coach/dashboard", {
              page: "app/coach/dashboard",
              title: "Coach Page",
              includes: {
                external: ["fontawesome", "js"]
              },
              coach
            });
          }
        }
      );
    });
  } else {
    res.redirect("/");
  }
};
