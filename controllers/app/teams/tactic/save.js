const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findByIdAndUpdate(req.session.user.team, {$push: {
      "tacticBoard.lineDatas": { $each: req.body.lineDatas },
      "tacticBoard.playerDatas": { $each: req.body.playerDatas},
      "tacticBoard.noteDatas": { $each: req.body.noteDatas}
    }}, {upsert: true}, err => {
      if (err) console.log(err);
      if (err) {return res.redirect("/")};  
    });
};
