const Team = require('../../../models/team/Team');
const User = require('../../../models/user/User');
const Coach = require('../../../models/coach/Coach');

module.exports = (req, res, next) => {
  Team
    .find({"teamId": req.query.id})
    .exec((err, team) => {
      if (err) return console.log(err);

      if (req.session.user) {
        User
          .find({"_id": req.session.user._id})
          .exec((err, user) => {
            res.render('app/main/team', {
              page: 'app/main/team',
              title: 'Your Team',
              includes: {
                external: ['fontawesome', 'js', 'socket.io']
              },
              team: team[0],
              user: user[0]
            });
          })
      } else {
        Coach
          .find({"_id": req.session.coach._id})
          .exec((err, user) => {
            res.render('app/main/team', {
              page: 'app/main/team',
              title: 'Your Team',
              includes: {
                external: ['fontawesome', 'js', 'socket.io']
              },
              team: team[0],
              user: user[0]
            });
          })
      }
    });
}
