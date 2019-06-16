const Team = require("../../../models/team/Team");

module.exports = (req, res, next) => {
  Team.findByIdAndUpdate(
    req.query.team,
    { $pull: { "events": { "_id": req.query.id } } },
    { upsert: true, new: true},
    (err, team) => {
      if (err) return res.redirect("/");

      res.redirect('/calendar/?month=0&year=0');
    }
  );
};
