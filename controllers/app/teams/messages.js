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
            res.render('app/team/messages', {
              page: 'app/team/messages',
              title: 'Messages',
              includes: {
                external: ['fontawesome', 'js', 'socket.io']
              },
              team,
              user
            });
          });
    });
}
