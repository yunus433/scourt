const User = require('../../../models/user/User');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  User
    .findOne({email: req.session.user.email})
    .then(user => {
      if (user.completed) {
        if (user.team) {
          Team
            .findById(user.team, (err, team) => {
              if (err) return res.redirect('/de');
  
              if (team) {
                return res.render('de/dashboard', {
                  page: 'de/dashboard',
                  title: 'Dashboard',
                  includes: {
                    external: ["fontawesome", "js"]       
                  },
                  user,
                  team
                });
              } else {
                return res.render('de/dashboard', {
                  page: 'de/dashboard',
                  title: 'Dashboard',
                  includes: {
                    external: ["fontawesome", "js"]       
                  },
                  user
                });
              }
            }); 
        } else {
          res.render('de/dashboard', {
            page: 'de/dashboard',
            title: 'Dashboard',
            includes: {
              external: ["fontawesome", "js"]       
            },
            user
          });
        };
      } else {
        res.redirect('/de/validate');
      };
    });     
};
