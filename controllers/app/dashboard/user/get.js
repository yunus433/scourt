const User = require('../../../../models/user/User');
const Team = require('../../../../models/team/Team');

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
                return res.render('app/dashboard/user', {
                  page: 'app/dashboard/user',
                  title: 'User Dashboard',
                  includes: {
                    external: ["fontawesome", "js", "socket.io"]       
                  },
                  user,
                  team
                });
              } else {
                return res.render('app/dashboard/user', {
                  page: 'app/dashboard/user',
                  title: 'User Dashboard',
                  includes: {
                    external: ["fontawesome", "js", "socket.io"]       
                  },
                  user
                });
              }
            }); 
        } else {
          res.render('app/dashboard/user', {
            page: 'app/dashboard/user',
            title: 'Main Page',
            includes: {
              external: ["fontawesome", "js", "socket.io"]       
            },
            user
          });
        };
      } else {
        res.redirect('/app/validate');
      };
    });     
};
