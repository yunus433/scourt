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
              if (err) return res.redirect('/');
  
              if (team) {
                return res.render('app/dashboard', {
                  page: 'app/dashboard',
                  title: 'Dashboard',
                  includes: {
                    external: ["fontawesome", "js"]       
                  },
                  user,
                  team
                });
              } else {
                return res.render('app/dashboard', {
                  page: 'app/dashboard',
                  title: 'Dashboard',
                  includes: {
                    external: ["fontawesome", "js"]       
                  },
                  user
                });
              }
            }); 
        } else {
          res.render('app/dashboard', {
            page: 'app/dashboard',
            title: 'Main Page',
            includes: {
              external: ["fontawesome", "js"]       
            },
            user
          });
        };
      } else {
        res.redirect('/app/validate');
      };
    });     
};
