const moment = require('moment');

const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  const newSession = {
    "name": req.body.name,
    "drills": JSON.parse(req.body.drills),
    "createdAt": moment(Date.now()).format("dddd, MMMM Do YYYY")
  };
  
  Team.findByIdAndUpdate(req.session.user.team, { $push: {
    "trainingSessions": newSession
  }}, {upsert: true}, err => {
    if (err) return res.redirect('/');

    return res.redirect('/trainings');
  });
};
