const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  Team.findByIdAndUpdate(req.session.user.team, {$pull: {
    "tacticBoard.noteDatas": {"_id": req.query.id}
  }}, {upsert: true}, err => {
    if (err) return res.redirect('/');

    res.redirect('/app/team/tactic');
  });
}
