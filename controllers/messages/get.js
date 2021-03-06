const Team = require('../../models/team/Team');
const User = require('../../models/user/User');

module.exports = (req, res, next) => {
  Team
    .findById(req.session.user.team)
    .exec((err, team) => {
      if (err) return res.redirect('/');

        User
          .findOne({"_id": req.session.user._id})
          .exec((err, user) => {
            if (err) return res.redirect('/');
            
            res.render('messages/index', {
              page: 'messages/index',
              title: 'Messages',
              includes: {
                external: ['fontawesome', 'js', 'socket.io', 'teamGeneral']
              },
              team,
              user,
              room: req.query.room
            });
          });
    });
}
