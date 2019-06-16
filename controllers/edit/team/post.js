const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findByIdAndUpdate(req.session.user.team, {$set: {
      name: req.body.name,
      description: req.body.description
    }}, {upsert: true})
    .exec(
      (err) => {
        if (err) return console.log(err);

        return res.redirect('/players');
      }
    );     
};
