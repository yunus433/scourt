const Team = require('../../../../models/team/Team');
const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  Team
    .findOne({"teamId": req.query.id})
    .exec((err, team) => {
      if (err) return res.redirect('/');

        User
          .findOne({"_id": req.session.user._id})
          .exec((err, user) => {
            if (err) return res.redirect('/');
            
            team.videos.forEach(video => {
              if (video.file == req.query.video) {
                res.render('app/team/video/comments', {
                  page: 'app/team/video/comments',
                  title: 'Video Comments',
                  includes: {
                    external: ['fontawesome', 'js']
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
