const Team = require("../../models/team/Team");
const sendMail = require("../../utils/sendMail");

module.exports = (req, res, next) => {

  const comment = {
    content: req.body.content,
    time: req.body.time,
    exactTime: req.body.exactTime,
    taggedPlayers: req.body.taggedPlayers
  };

  Team.findOneAndUpdate(
    {
      "_id": req.session.user.team,
      "videos._id": req.body.id
    },
    {
      $push: {
        "videos.$.comments": comment
      }
    },
    (err, team) => {
      if (err) return console.log(err);

      comment.taggedPlayers.forEach(player => {
        sendMail(
          {
            player,
            video: req.query.id
          },
          "newComment",
          err => {
            if (err) return console.log(err);
          }
        );
      });
    }
  );
};
