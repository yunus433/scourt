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
            res.render('app/team/dashboard', {
              page: 'app/team/dashboard',
              title: 'Your Team',
              includes: {
                external: ['fontawesome']
              },
              team,
              user
            });
          });
    });
}
