const moment = require('moment');
const uniqid = require('uniqid');
const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  if (req.body && req.body.day && req.body.month && req.body.year && req.body.place && req.body.information) {
    const newTrainingObject = {
      date: {
        day: req.body.day,
        month: req.body.month,
        year: req.body.year
      },
      place: req.body.place,
      information: req.body.information,
      _createdAt: moment(Date.now()).format("dddd, MMMM Do YYYY"),
      comingPlayers: [],
      notComingPlayers: [],
      _id: uniqid()
    }

    Team
      .findById(req.session.user.team, (err, team) => {
        if (err) return res.redirect('/');

        team.players.forEach(player => {
          newTrainingObject.notComingPlayers.push(player);
        });
        Team
          .findByIdAndUpdate(req.session.user.team, {$push: {
            "trainings": newTrainingObject
          }}, {upsert: true}, err => {
            if (err) res.redirect('/');
    
            res.redirect('/app/team/trainings');
          });
      });
  } else {
    res.redirect('/');
  };
};
