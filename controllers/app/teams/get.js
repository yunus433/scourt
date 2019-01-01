const Team = require('../../../models/team/Team');
const User = require('../../../models/user/User');

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
  let beforeMonth;
  let beforeYear;
  let afterMonth;
  let afterYear;
  if (new Date().getMonth() != 0) {
    beforeMonth = (new Date().getMonth())-1;
    beforeYear = new Date().getFullYear();
  } else {
    beforeMonth = 11;    
    beforeYear = new Date().getFullYear()-1;
  } 
  if (new Date().getMonth() != 11) {
    afterMonth = (new Date().getMonth())+1;
    afterYear = new Date().getFullYear();
  } else {
    afterMonth = 0;    
    afterYear = new Date().getFullYear()+1; }
  Team
    .findOne({"teamId": req.query.id})
    .exec((err, team) => {
      if (err) return console.log(err);

        User
          .findOne({"_id": req.session.user._id})
          .exec((err, user) => {
            res.render('app/team/dashboard', {
              page: 'app/team/dashboard',
              title: 'Your Team',
              includes: {
                external: ['fontawesome', 'js', 'socket.io']
              },
              team,
              user,
              month,
              beforeMonth,
              beforeYear,
              afterMonth,
              afterYear
            });
          });
    });
}
