const User = require("../../../../models/user/User");
const Team = require("../../../../models/team/Team");

module.exports = (req, res, next) => {
  User.findOne({ email: req.session.user.email }).then((user) => {
    if (!user) return res.redirect('/auth/login/coach'); 
    if (user.completed) {
      Team
        .findById(user.team)
        .exec((err, team) => {
          if (err) return res.redirect("/");
  
          if (team) {
            return res.render("app/dashboard/coach", {
              page: "app/dashboard/coach",
              title: "Coach Dashboard",
              includes: {
                external: ["fontawesome", "js"]
              },
              user,
              team
            });
          } else {
            res.render("app/dashboard/coach", {
              page: "app/dashboard/coach",
              title: "Coach Dashboard",
              includes: {
                external: ["fontawesome", "js"]
              },
              user
            });
          };
        }
      );
    } else {
      res.redirect('/app/validate/coach');
    };
  });   
};
