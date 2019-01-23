const Team = require('../../../../models/team/Team');
const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  User
    .findOne({email: req.session.user.email}, (err, user) => {
      if (err) return res.redirect('/');
      
      Team
        .findById(req.session.user.team)
        .exec((err, team) => {
          if (err) return res.redirect('/');

          res.render('app/team/edit', {
            page: 'app/team/edit',
            title: 'Team Page',
            includes: {
              external: ["fontawesome", "js"]       
            },
            team,
            user
          });
        });
    });
};
