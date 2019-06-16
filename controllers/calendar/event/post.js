const crypto = require('crypto');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  let id = crypto.randomBytes(8).toString('hex');

  const newEventObject = {
    name: req.body.name,
    type: req.body.type,
    date: {
      day: parseInt(req.body.date.split('/')[0]),
      month: parseInt(req.body.date.split('/')[1])-1,
      year: parseInt(req.body.date.split('/')[2])
    },
    description: req.body.description,
    _id: id
  };

  Team
    .findByIdAndUpdate(req.session.user.team, {$push: {
      events: newEventObject
    }}, {upsert: true, new: true})
    .exec((err, team) => {
      if (err) return res.redirect('/');

      res.redirect('/calendar/?month=0&year=0');
    });
}
