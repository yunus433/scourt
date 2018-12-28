const Team = require('../../../models/team/Team');
const User = require('../../../models/user/User');
const Coach = require('../../../models/coach/Coach');

module.exports = (req, res, next) => {
  let month = [{
    name: "January",
    day: 31
  },
  {
    name: "February",
    day: 28,
    day2: 29
  },
  {
    name: "March",
    day: 31
  },
  {
    name: "April",
    day: 30
  },
  {
    name: "May",
    day: 31
  },
  {
    name: "June",
    day: 30
  },
  {
    name: "July",
    day: 31
  },
  {
    name: "August",
    day: 31
  },
  {
    name: "September",
    day: 30
  },
  {
    name: "October",
    day: 31
  },
  {
    name: "November",
    day: 30
  },
  {
    name: "December",
    day: 31
  }];
  Team
    .findOne({"teamId": req.query.id})
    .exec((err, team) => {
      if (err) return console.log(err);

      if (req.session.user) {
        User
          .findOne({"_id": req.session.user._id})
          .exec((err, user) => {
            res.render('app/main/team', {
              page: 'app/main/team',
              title: 'Your Team',
              includes: {
                external: ['fontawesome', 'js', 'socket.io']
              },
              team,
              user,
              month
            });
          })
      } else {
        Coach
          .findOne({"_id": req.session.coach._id})
          .exec((err, user) => {
            res.render('app/main/team', {
              page: 'app/main/team',
              title: 'Your Team',
              includes: {
                external: ['fontawesome', 'js', 'socket.io']
              },
              team,
              user,
              month
            });
          })
      }
    });
}
