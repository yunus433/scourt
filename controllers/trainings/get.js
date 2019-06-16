const Team = require('../../models/team/Team');
const User = require('../../models/user/User');

module.exports = (req, res, next) => {
  const month = [
    {
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
    .findById(req.session.user.team)
    .exec((err, team) => {
      if (err) return res.redirect('/');

        User
          .findOne({"_id": req.session.user._id})
          .exec((err, user) => {
            if (err) return res.redirect('/');
            
            res.render('trainings/index', {
              page: 'trainings/index',
              title: 'Training Page',
              includes: {
                external: ['fontawesome', 'js']
              },
              team,
              user,
              month
            });
          });
    });
}
