const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  const newEventObject = {
    name: req.body.name,
    type: req.body.type,
    date: {
      day: req.body.day,
      month: req.body.month,
      year: req.body.year
    },
    note: req.body.description
  }

  Team
    .findByIdAndUpdate(req.query.id, {$push: {
      events: newEventObject
    }}, {upsert: true, new: true})
    .exec((err, team) => {
      if (err) return res.redirect('/');

      res.redirect('/app/team/?id=' + team.teamId);
    });
}
