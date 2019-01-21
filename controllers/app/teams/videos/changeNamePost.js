const Team = require("../../../../models/team/Team");

module.exports = (req, res, next) => {
  if (req.body && req.body.videoName) {
    Team
      .findOneAndUpdate({
        "videos.file": req.query.id
        }, {$set: {
          "videos.$.name": req.body.videoName
        }}, (err, team) => {
        if (err) return res.redirect('/');

        res.redirect('/app/team/videos/?id=' + team.teamId);
      });
  };
};
