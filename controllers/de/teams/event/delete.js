const Team = require("../../../../models/team/Team");

module.exports = (req, res, next) => {
  Team.findByIdAndUpdate(
    req.query.team,
    { $pull: { "events": { "_id": req.query.id } } },
    { upsert: true, new: true},
    (err, team) => {
      if (err) return res.redirect("/de");

      res.redirect('/de/team/?id=' + team.teamId);
    }
  );
};
