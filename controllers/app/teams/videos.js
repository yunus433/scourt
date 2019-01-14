const Team = require('../../../models/team/Team');
const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  Team
    .findOne({"teamId": req.query.id})
    .exec((err, team) => {
      if (err) return res.redirect('/');

        User
          .findOne({"_id": req.session.user._id})
          .exec((err, user) => {
            if (err) return res.redirect('/');
            
            res.render('app/team/videos', {
              page: 'app/team/videos',
              title: 'Video Analyzes',
              includes: {
                external: ['js']
              },
              team,
              user
            });
          });
    });
}
