const Coach = require("../../../../models/coach/Coach");
const Team = require("../../../../models/team/Team");

module.exports = (req, res, next) => {
  if (req.session.coach) {
    Coach.findOne({ email: req.session.coach.email }).then(coach => {
      Team.find().exec((err, teams) => {
        if (err) return console.log(err);
        let cantFind = true;

        if (teams) {
          teams.forEach(team => {
            if (team.creator._id == req.session.coach._id.toString()) {
              cantFind = false;
  
              return res.render("app/coach/dashboard", {
                page: "app/coach/dashboard",
                title: "Coach Page",
                includes: {
                  external: ["fontawesome", "js"]
                },
                coach,
                team: team
              });
            }
          });
        }

        if (cantFind) {
          res.render("app/coach/dashboard", {
            page: "app/coach/dashboard",
            title: "Coach Page",
            includes: {
              external: ["fontawesome", "js"]
            },
            coach
          });
        }
      });
    });
  } else {
    res.redirect("/");
  }
};
