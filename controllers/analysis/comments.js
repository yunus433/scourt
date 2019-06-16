const Team = require('../../models/team/Team');
const User = require('../../models/user/User');

module.exports = (req, res, next) => {
  Team
    .findById(req.session.user.team)
    .exec((err, team) => {
      if (err) return res.redirect('/');

        User
          .findById(req.session.user._id)
          .exec((err, user) => {
            if (err) return res.redirect('/');
            
            team.videos.forEach(video => {
              if (video._id == req.query.id) {
                res.render('analysis/comments', {
                  page: 'analysis/comments',
                  title: 'Video Comments',
                  includes: {
                    external: ['fontawesome', 'js', 'teamGeneral']
                  },
                  team,
                  user,
                  video
                });
              };
            });
          });
    });
};
