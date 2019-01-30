const Team = require('../../../models/team/Team');
const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  Team
    .findById(req.session.user.team)
    .exec((err, team) => {
      if (err) return res.redirect('/de');

        User
          .findOne({"_id": req.session.user._id})
          .exec((err, user) => {
            if (err) return res.redirect('/de');
            
            res.render('de/team/messages', {
              page: 'de/team/messages',
              title: 'Messages',
              includes: {
                external: ['fontawesome', 'js', 'socket.io', 'teamDeGeneral']
              },
              team,
              user
            });
          });
    });
}
