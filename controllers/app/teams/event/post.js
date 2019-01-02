const crypto = require('crypto');
const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  let id = crypto.randomBytes(8).toString('hex');

  const newEventObject = {
    name: req.body.name,
    type: req.body.type,
    date: {
      day: req.body.day,
      month: req.body.month,
      year: req.body.year
    },
    note: req.body.description,
    _id: id
  };

  Team
    .findByIdAndUpdate(req.query.id, {$push: {
      events: newEventObject
    }}, {upsert: true, new: true})
    .exec((err, team) => {
      if (err) return res.redirect('/');

      res.redirect('/app/team/calendar/?id=' + team.teamId);
    });
}
