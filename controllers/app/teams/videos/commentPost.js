const Team = require('../../../../models/team/Team');
const sendMail = require('../../../../utils/sendMail');

module.exports = (req, res, next) => {
  if (req.body && req.body.time) {
    const comment = {
      content: req.body.content,
      time: req.body.time,
      taggedPlayers: []
    };

    Team
      .findById(req.session.user.team, (err, team) => {
        if (err) return res.redirect('/');

        team.players.forEach(player => {
          if (req.body[player._id]) {
            comment.taggedPlayers.push(player);
          };
        });

        Team
          .findOneAndUpdate({
            "videos._id": req.query.id
          }, {$push: {
            "videos.$.comments": comment
          }}, err => {
            if (err) return res.redirect('/');
            
            comment.taggedPlayers.forEach(player => {
              sendMail({
                player,
                video: req.query.video
              }, 'newComment', err => {
                if (err) return res.redirect('/');
              });
            })
            return res.redirect("/app/team/videos/comments/?id=" + req.query.id);
          });
      });
  } else {
    return res.redirect("/app/team/videos/comments/?id=" + req.query.id);
  };
};
