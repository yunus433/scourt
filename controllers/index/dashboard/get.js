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
                return res.render('index/dashboard', {
                  page: 'index/dashboard',
                  title: 'Dashboard',
                  includes: {
                    external: ["fontawesome", "js", "socket.io"]       
                  },
                  user,
                  team
                });
              } else {
                return res.render('index/dashboard', {
                  page: 'index/dashboard',
                  title: 'Dashboard',
                  includes: {
                    external: ["fontawesome", "js", "socket.io"]       
                  },
                  user
                });
              }
            }); 
        } else {
          res.render('index/dashboard', {
            page: 'index/dashboard',
            title: 'Dashboard',
            includes: {
              external: ["fontawesome", "js", "socket.io"]       
            },
            user
          });
        };
      } else {
        res.redirect('/auth/validate');
      };
    });     
};
