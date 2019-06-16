const Team = require('../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findByIdAndUpdate(req.session.user.team, {$push: {
      "tacticBoard.lineDatas": { $each: req.body.lineDatas },
      "tacticBoard.playerDatas": { $each: req.body.playerDatas},
      "tacticBoard.noteDatas": { $each: req.body.noteDatas}
    }}, {upsert: true}, err => {
      if (err) {return res.redirect("/")};  
    });
  req.body.updatePlayers.forEach(player => {
    Team
      .findOneAndUpdate({
        "_id": req.session.user.team, 
        "tacticBoard.playerDatas._id": player._id}, {$set: {
        "tacticBoard.playerDatas.$.position": player.position
      }}, {upsert: true}, err => {
        if (err) {
          return res.redirect('/')
        } else {
          res.redirect('/tactics');
        }        
      });
  });
};
