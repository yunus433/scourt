const Team = require('../../../../models/team/Team');
const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  User
    .findOne({email: req.session.user.email}, (err, user) => {
      if (err) return res.redirect('/de');
      
      Team
        .findById(req.session.user.team)
        .exec((err, team) => {
          if (err) return res.redirect('/');

          res.render('de/team/edit', {
            page: 'de/team/edit',
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
