const Team = require('../../models/team/Team');
const User = require('../../models/user/User');

module.exports = (req, res, next) => {
  const month = [
    {
    name: "jan",
    day: 31
  },
  {
    name: "feb",
    day: 28,
    day2: 29
  },
  {
    name: "mar",
    day: 31
  },
  {
    name: "apr",
    day: 30
  },
  {
    name: "may",
    day: 31
  },
  {
    name: "june",
    day: 30
  },
  {
    name: "july",
    day: 31
  },
  {
    name: "aug",
    day: 31
  },
  {
    name: "sept",
    day: 30
  },
  {
    name: "oct",
    day: 31
  },
  {
    name: "nov",
    day: 30
  },
  {
    name: "dec",
    day: 31
  }];

  Team
    .findById(req.session.user.team)
    .exec((err, team) => {
      if (err || !team) return res.redirect('/');

      const monthNumber = parseInt(req.query.month);

      let newYear = 0;
      if (new Date().getMonth() > ((new Date().getMonth()+monthNumber)%12))
        newYear = 1;

      const calendarDate = new Date(new Date().getFullYear()+newYear+(Math.floor(monthNumber/12)), ((new Date().getMonth()+monthNumber)%12), 1)

      User
        .findOne({"_id": req.session.user._id})
        .exec((err, user) => {
          if (err) return res.redirect('/');
          res.render('calendar/index', {
            page: 'calendar/index',
            title: 'Calendar',
            includes: {
              external: ['fontawesome', 'js']
            },
            team,
            user,
            month,
            calendarDate,
            monthNumber
          });
        });
    });
};
