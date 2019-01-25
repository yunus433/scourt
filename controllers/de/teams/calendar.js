const Team = require('../../../models/team/Team');
const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  const month = [
    {
    name: "Januar",
    day: 31
  },
  {
    name: "Februar",
    day: 28,
    day2: 29
  },
  {
    name: "März",
    day: 31
  },
  {
    name: "April",
    day: 30
  },
  {
    name: "Mai",
    day: 31
  },
  {
    name: "Juni",
    day: 30
  },
  {
    name: "Juli",
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
    name: "Oktober",
    day: 31
  },
  {
    name: "November",
    day: 30
  },
  {
    name: "Dezember",
    day: 31
  }];
  let beforeMonth;
  let before2Month;
  let beforeYear;
  let before2Year;
  let afterMonth;
  let after2Month;
  let afterYear;
  let after2Year;
  if (new Date().getMonth() == 0) {
    beforeMonth = 11;    
    before2Month = 10;
    beforeYear = new Date().getFullYear()-1;
    before2Year = new Date().getFullYear()-1;
  } else if (new Date().getMonth() == 1) {
    beforeMonth = (new Date().getMonth())-1;
    before2Month = 11;
    beforeYear = new Date().getFullYear();
    before2Year = new Date().getFullYear()-1;
  } else {
    beforeMonth = (new Date().getMonth())-1;
    before2Month = (new Date().getMonth())-2;
    beforeYear = new Date().getFullYear();
    beforeTwoYear = new Date().getFullYear();
  } 
  if (new Date().getMonth() == 11) {
    afterMonth = 0;    
    after2Month = 1;
    afterYear = new Date().getFullYear()+1;
    after2Year = new Date().getFullYear()+1;
  } else if (new Date().getMonth() == 10) {
    afterMonth = (new Date().getMonth())+1;
    after2Month = 0;
    afterYear = new Date().getFullYear();
    after2Year = new Date().getFullYear()+1;
  } else {
    afterMonth = (new Date().getMonth())+1;
    after2Month = (new Date().getMonth())+2;
    afterYear = new Date().getFullYear();
    after2Year = new Date().getFullYear();
  }
  Team
    .findById(req.session.user.team)
    .exec((err, team) => {
      if (err) return res.redirect('/de');

      User
        .findOne({"_id": req.session.user._id})
        .exec((err, user) => {
          res.render('de/team/calendar', {
            page: 'de/team/calendar',
            title: 'Calendar',
            includes: {
              external: ['fontawesome', 'js']
            },
            team,
            user,
            month,
            beforeMonth,
            before2Month,
            beforeYear,
            before2Year,
            afterMonth,
            after2Month,
            afterYear,
            after2Year
          });
        });
    });
};
