const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  console.log(req.query.id);
  Team  
    .findOneAndUpdate({"_id": req.session.user.team}, {$pull: {
      "trainings": {"_id": req.query.id}
    }}, {upsert: true}, err => {
      if (err) console.log(err);
      if (err) return res.redirect('/');

      res.redirect('/app/team/trainings');
    });
};
