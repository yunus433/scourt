const Team = require('../../../../models/team/Team');
const uniqid = require('uniqid')

module.exports = (req, res, next) => {
  let found = false;
  Team 
    .findById(req.session.user.team, (err, team) => {
      if (err) return res.redirect('/');

      team.videos.forEach(video => {
        if (!video.completed) {
          found = true;
          
          res.render('app/team/video/new', {
            page: 'app/team/video/new',
            title: 'Video Upload',
            includes: {
              external: ['fontawesome', 'cloudinary']
            },
            team,
            video
          });
        };
      });

      if (!found) {
        const newVideoObject = {
          completed: false,
          _id: uniqid()
        };
        
        Team
          .findByIdAndUpdate(req.session.user.team, {$push: {
            "videos": newVideoObject
          }}, (err, team) => {
            if (err) return res.redirect('/');
    
            res.render('app/team/video/new', {
              page: 'app/team/video/new',
              title: 'Video Upload',
              includes: {
                external: ['fontawesome', 'cloudinary']
              },
              team,
              video: newVideoObject
            });
          });
      };
    });
};
