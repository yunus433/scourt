const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findByIdAndUpdate(req.query.id, {$set: {
      name: req.body.name,
      description: req.body.description
    }}, {upsert: true})
    .exec(
      (err) => {
        if (err) return res.redirect('/de');

        return res.redirect('/de/dashboard/coach');
      }
    );     
};
