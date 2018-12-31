const Team = require("../../../../models/team/Team");

module.exports = (req, res, next) => {
  Team.findByIdAndUpdate(
    req.query.team,
    { $pull: { "events": { "_id": req.query.id } } },
    { upsert: true, new: true},
    (err, team) => {
      if (err) return res.redirect("/");

      res.redirect('/app/team/?id=' + team.teamId);
    }
  );
};
